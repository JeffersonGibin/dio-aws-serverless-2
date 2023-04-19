import { v4 } from "uuid";
import { Validator } from "node-input-validator";
import { createReservationDynamoDBRepository } from "./infra/repositories/create-reservation.dynamodb.repository.js";

const payloadValidate = async (body) => {
  const validate = new Validator(body, {
    room: "required",
    dateStart: "required",
    dateEnd: "required",
    responsible: "required",
  });

  await validate.check();

  return validate;
};

export async function handler(event) {
  const body = JSON.parse(event.body);
  const validator = await payloadValidate(body);
  const validatorIsFail = await validator.fails();

  if (validatorIsFail) {
    return {
      statusCode: 422,
      body: JSON.stringify(validator.errors),
    };
  }

  try {
    const id = v4();
    const createdAt = new Date().toISOString();
    const { room, dateStart, dateEnd, responsible } = body;

    const newItem = {
      id,
      room,
      dateStart,
      dateEnd,
      responsible,
      status: "PENDING",
      createdAt,
    };

    await createReservationDynamoDBRepository(newItem);

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "SUCCESS",
        message: "Reserva criada com sucesso!",
        data: newItem,
      }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        status: "ERROR",
        message: "Ocorreu um erro ao criar uma tarefa!",
      }),
    };
  }
}
