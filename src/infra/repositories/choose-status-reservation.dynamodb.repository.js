import AWS from "aws-sdk";

export const chooseStatusReservationDynamoDBRepository = async (payload) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  await dynamodb
    .update({
      TableName: "ReservationTable",
      Key: { id: payload.id },
      UpdateExpression: "set #s = :s",
      ExpressionAttributeNames: {
        "#s": "status",
      },
      ExpressionAttributeValues: {
        ":s": payload.status,
      },
      ReturnValues: "ALL_NEW",
    })
    .promise();
};
