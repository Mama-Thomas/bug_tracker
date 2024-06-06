const pool = require("../config/dbConfig");

const getProjects = async () => {
  return pool.query(
    `SELECT 
      p.projectid, 
      p.name, 
      p.startdate, 
      p.enddate, 
      u.firstname || ' ' || u.lastname as projectmanager 
     FROM projects p
     LEFT JOIN users u ON p.projectmanagerid = u.userid`
  );
};



const getProjectById = async (id) => {
  return pool.query(
    `SELECT 
      p.projectid, 
      p.name, 
      p.startdate, 
      p.enddate, 
      u.firstname || ' ' || u.lastname as projectmanager 
     FROM projects p
     LEFT JOIN users u ON p.projectmanagerid = u.userid 
     WHERE p.projectid = $1`,
    [id]
  );
};

const createProject = async (
  name,
  startdate,
  enddate,
  projectmanagerid,
  userids
) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const projectResult = await client.query(
      "INSERT INTO projects (name, startdate, enddate, projectmanagerid) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, startdate, enddate, projectmanagerid]
    );
    const projectid = projectResult.rows[0].projectid;

    if (Array.isArray(userids)) {
      for (const userid of userids) {
        await client.query(
          "INSERT INTO users_projects (userid, projectid) VALUES ($1, $2)",
          [userid, projectid]
        );
      }
    }

    await client.query("COMMIT");
    return projectResult;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

const updateProject = async (
  id,
  name,
  startdate,
  enddate,
  projectmanagerid,
  userids
) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const projectResult = await client.query(
      "UPDATE projects SET name=$1, startdate=$2, enddate=$3, projectmanagerid=$4 WHERE projectid=$5 RETURNING *",
      [name, startdate, enddate, projectmanagerid, id]
    );

    await client.query("DELETE FROM users_projects WHERE projectid = $1", [id]);

    if (Array.isArray(userids)) {
      for (const userid of userids) {
        await client.query(
          "INSERT INTO users_projects (userid, projectid) VALUES ($1, $2)",
          [userid, id]
        );
      }
    }

    await client.query("COMMIT");
    return projectResult;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

const deleteProject = async (id) => {
  return pool.query("DELETE FROM projects WHERE projectid=$1", [id]);
};

const getUsersByProjectId = async (projectid) => {
  return pool.query(
    `SELECT u.userid, u.firstname, u.lastname, r.name as rolename
     FROM users u
     JOIN users_projects up ON u.userid = up.userid
     JOIN roles r ON u.roleid = r.roleid
     WHERE up.projectid = $1`,
    [projectid]
  );
};

// const getUserProjects = async (userId) => {
//   return pool.query(
//     `SELECT p.projectid, p.name
//      FROM Projects p
//      JOIN users_projects pu ON p.projectid = pu.userprojectid
//      WHERE pu.userid = $1`,
//     [userId]
//   );
// };

const getUserProjects = async (userId) => {
  return pool.query(
    `SELECT p.projectid, p.name, p.startdate, p.enddate, u.firstname || ' ' || u.lastname as projectmanager
     FROM projects p
     JOIN users_projects up ON p.projectid = up.projectid
     LEFT JOIN users u ON p.projectmanagerid = u.userid
     WHERE up.userid = $1`,
    [userId]
  );
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getUsersByProjectId,
  getUserProjects
};
