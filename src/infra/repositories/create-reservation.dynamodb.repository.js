import AWS from "aws-sdk";

export const createReservationDynamoDBRepository = async (payload) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const result = await dynamodb
    .put({
      TableName: "ReservationTable",
      Item: payload,
    })
    .promise();

  return result;
};
