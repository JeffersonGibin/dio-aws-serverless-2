import AWS from "aws-sdk";

export const findByIdDynamoDBRepository = async (id) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const result = await dynamodb
      .get({
        TableName: "ReservationTable",
        Key: { id },
      })
      .promise()
      .then((result) => result.Item);

    return result
}