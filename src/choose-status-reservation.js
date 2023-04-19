import { Validator } from "node-input-validator";
import { findByIdDynamoDBRepository } from "./infra/repositories/find-by-id.dynamodb.repository.js";
import { chooseStatusReservationDynamoDBRepository } from "./infra/repositories/choose-status-reservation.dynamodb.repository.js";
import { chooseStatusReservationUseCase } from "./core/usecases/choose-status-reservation.usecase.js";

const payloadValidate = async (body) => {
  const validate = new Validator(body, {
    status: "required|in:CANCELLED, CONFIRMED, COMPLETED",
  });

  await validate.check();

  return validate;
};

export async function handler(event) {
  const body = JSON.parse(event.body) ?? {};
  const validator = await payloadValidate(body);
  const validatorIsFail = await validator.fails();

  if (validatorIsFail) {
    return {
      statusCode: 422,
      body: JSON.stringify(validator.errors),
    };
  }
  const id = event.pathParameters?.id ?? "";

  try {
    const result = await chooseStatusReservationUseCase(
      {
        id,
        status: body.status,
      },
      {
        findByIdDynamoDBRepository,
        chooseStatusReservationDynamoDBRepository,
      }
    );

    if (result.status !== "SUCCESS") {
      return {
        statusCode: 422,
        body: JSON.stringify({
          status: result.status,
          message: result.message,
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: result.status,
        message: result.message,
      }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      body: JSON.stringify({
        status: "ERROR",
        message: "Ocorreu um erro ao alterar o status!",
      }),
    };
  }
}
