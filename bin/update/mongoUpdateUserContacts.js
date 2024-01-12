db.animals.aggregate([
  {
    $lookup: {
      from: "users",  // Assuming your user collection is named "users"
      localField: "donator_id",
      foreignField: "_id",
      as: "donator_info"
    }
  },
  {
    $unwind: "$donator_info"  // Unwind the donator_info array created by $lookup
  },
  {
    $project: {
      name: 1,
      image: 1,
      status: 1,
      donator_id: 1,
      specie_id: 1,
      description: 1,
      traits: 1,
      created_at: 1,
      last_modified_at: 1,
      contact: [
        {
          contact_type: "WHATSAPP",
          contact_value: "$donator_info.phone_number"
        },
        {
          contact_type: "EMAIL",
          contact_value: "$donator_info.email"
        }
      ]
    }
  },
  {
    $merge: "animals" // Write the results back to the "animals" collection
  }
]);
