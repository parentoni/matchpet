// chatgpt GOAT
  db.animals.aggregate([{
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
        $addFields: {
            ibgeId: "$user_info.ibgeId"
        }
    },
    {
        $project: {
            user_info: 0
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
])

// Execute the aggregation pipeline

