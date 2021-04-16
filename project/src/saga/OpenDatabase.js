
import SQLite from "react-native-sqlite-storage";





const OpenDatabase = async () => {
    SQLite.enablePromise(true);
    try {
      const db = await SQLite.openDatabase({
        name: "database.db",
        createFromLocation: "~www/database.db",
      });
      return db;
    } catch (error) {
      console.log("open database error:", error);
      return null;
    }
  };
  
  export const ExecuteSQL = async (sqlStatement, args = []) => {
    const db = await OpenDatabase();
    if (db) {
      try {
        const response = await db.executeSql(sqlStatement, args);
        const results = response[0];
  
        db.close();
        return results;
      } catch (error) {
        console.log("execute sql error:", error);
      }
    }
    return null;
  };