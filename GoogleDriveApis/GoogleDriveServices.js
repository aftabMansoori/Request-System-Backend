const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

const credentials = require("./credentials.json");

const scopes = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  scopes
);

const drive = google.drive({ version: "v3", auth });

const createFolder = async (
  folderName,
  parentFolderId = process.env.ROOT_FOLDER_ID
) => {
  return await new Promise((resolve, reject) => {
    drive.files.create(
      {
        resource: {
          name: folderName,
          mimeType: "application/vnd.google-apps.folder",
          parents: [parentFolderId],
        },
        fields: "id, name, trashed, parents, permissionIds",
      },
      function (err, res) {
        if (err) reject(err);
        resolve(res);
      }
    );
  });
};

const deleteFile = async (fileId) => {
  return await new Promise((resolve, reject) => {
    drive.files.delete(
      {
        fileId: fileId,
      },
      function (err, res) {
        if (err) reject(err);
        resolve(res);
      }
    );
  });
};

const readPermission = async (fileId, email, type) => {
  return await new Promise((resolve, reject) => {
    drive.permissions.create(
      {
        fileId: fileId,
        transferOwnership: "false",
        requestBody: {
          role: "reader",
          type: type,
          emailAddress: email,
        },
      },
      function (err, res) {
        if (err) reject(err);
        resolve(res);
      }
    );
  });
};

module.exports = {
  createFolder,
  deleteFile,
  readPermission,
};
