/**
 * file nau cua phien ban cu khong dung nua
 * :3
 */

const fs = require("fs");
const path = require("path");
const DataDir = path.resolve(__dirname, "../../Data");


const createModel = (modelName) => {

    const DataFile = path.resolve(DataDir, modelName) + ".json";

    const INIT = (() => {
        if (!fs.existsSync(DataDir))
            fs.mkdirSync(DataDir);

        if (!fs.existsSync(DataFile))
            fs.writeFileSync(DataFile, []);
    })();
    INIT;

    const addEntitie = (entitie) => {
        if (!validition(entitie)) {
            return null;
        } else {
            entitie = {
                id: Date.now().toString(),
                title: entitie.title,
                body: entitie.body,
                createdAt: new Date(),
                completed: false,
                completedAt: null
            };
            return addData(entitie);
        }
    }

    const getAllEntities = () => {
        try {
            const data = JSON.parse(fs.readFileSync(DataFile));
            return data;
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    const addData = (entitie) => {
        if (!fs.existsSync(DataDir))
            fs.mkdirSync(DataDir, { recursive: true });
        try {
            var data = getAllEntities();
            console.log(data);
            console.log(entitie);

            if (!data)
                data = [entitie];
            else
                data = [...data, entitie];

            INIT;
            fs.writeFileSync(DataFile, JSON.stringify(data));

            return entitie;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    const validition = (entitie) => {
        if (entitie.title === "" || entitie.body === "")
            return false;
        return true;
    }

    const getEntitieById = (id) => {
        const data = getAllEntities();
        const entitie = data.find((entitie) => entitie.id === id);
        if (!entitie)
            return null;
        else
            return entitie;
    }

    const Update = (entitie) => {
        var res = null;
        var entities = getAllEntities();
        entities.find((item) => {
            if (item.id !== entitie.id) return;

            item.body = entitie.body || item.body;
            item.title = entitie.title || item.title;

            if (!item.completed && entitie.completed) {
                item.completed = true;
                item.completedAt = new Date();
            } else if (item.completed && !entitie.completed) {
                item.completed = false;
                item.completedAt = null;
            }

            res = item;
        });
        try {
            fs.writeFileSync(DataFile, JSON.stringify(entities));
            return res;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    const deleteById = (id) => {
        var res = null;
        var entities = getAllEntities();
        entities.find((item) => {
            if (item.id !== id) return;
            res = item;
            item.id = entities[entities.length - 1].id;
            item.body = entities[entities.length - 1].body;
            item.title = entities[entities.length - 1].title;
            item.createdAt = entities[entities.length - 1].createdAt;
            item.completed = entities[entities.length - 1].completed;
            item.completedAt = entities[entities.length - 1].completedAt;
        });
        entities.splice(entities.length - 1, 1);
        try {
            fs.writeFileSync(DataFile, JSON.stringify(entities));
            return res;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    return { addEntitie, getAllEntities, getEntitieById, Update, deleteById };
}

module.exports = createModel;