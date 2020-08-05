const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
} = require('../lib/zookeepers.js');
const { zookeepers } = require('../data/zookeepers');

jest.mock('fs');

test("creates a zookeeper object", () => {
    const zookeeper = createNewZookeeper(
        { name: "Josie", id: "jhgdja3ng2"},
        zookeepers
    );

    expect(zookeeper.name).toBe("Josie");
    expect(zookeeper.id).toBe("jhgdja3ng2");
});

test("filters by query", () => {
    const startingZookeepers = [
        {
            "id": "6",
            "name": "Amiko",
            "age": 43,
            "favoriteAnimal": "Quokkas"
          },
          {
            "id": "7",
            "name": "Emmy",
            "age": 29,
            "favoriteAnimal": "Duckbilled Platypus"
          }
    ];

    const updateZookeepers = filterByQuery({ favoriteAnimal: "Quokkas" }, startingZookeepers);

    expect(updateZookeepers.length).toEqual(1);
});

test("finds by id", () => {
    const startingZookeepers = [
        {
            "id": "6",
            "name": "Amiko",
            "age": 43,
            "favoriteAnimal": "Quokkas"
          },
          {
            "id": "7",
            "name": "Emmy",
            "age": 29,
            "favoriteAnimal": "Duckbilled Platypus"
          }
    ];

    const result = findById("7", startingZookeepers);
    expect(result.name).toBe("Emmy");
});

test("validates favorite animal", () => {
    const zookeeper = {
        id: "7",
        name: "Emmy",
        age: 29,
        favoriteAnimal: "Duckbilled Platypus"
    };

    const invalidZookeeper = {
        id: "7",
        name: "Emmy",
        age: 29
    };

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});