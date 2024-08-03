db.animals.aggregate([
    {
        $lookup: {
            from: "users",
            localField: "donator_id",
            foreignField: "_id",
            as: "user_info"
        }
    },
    {
        $unwind: "$user_info"
    },
    {
        $project: {
            _id: 1,
            name: 1,
            age: 1,
            image: 1,
            created_at: 1,
            status: 1,
            donator_id: 1,
            specie_id: 1,
            description: 1,
            traits: 1,
            __v: 1,
            last_modified_at: 1,
            contact: 1,
            sex: 1,
            views: 1,
            clicks: 1,
            ibgeId: "$user_info.ibgeId"
        }
    },
    {
        $merge: {
            into: "animals",
            on: "_id",
            whenMatched: "merge",
            whenNotMatched: "fail"
        }
    }
]);
