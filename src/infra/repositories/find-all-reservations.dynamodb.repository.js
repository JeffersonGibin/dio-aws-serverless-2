import AWS from "aws-sdk";

export const findAllReservationsDynamoDBRepository = async () => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const results = await dynamodb
    .scan({
      TableName: "ReservationTable",
    })
    .promise();

  return results;
};
