import { findAllReservationsDynamoDBRepository } from "./infra/repositories/find-all-reservations.dynamodb.repository.js";
import { buildSearchResultsForReservationsUseCase } from "./core/usecases/build-search-results-for-reservations.usecase.js";

export async function handler(event) {
  try {
    const newResult = await buildSearchResultsForReservationsUseCase({
      findAllReservationsDynamoDBRepository,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "SUCCESS",
        data: newResult,
      }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        status: "ERROR",
        message: "Ocorreu um erro ao buscar as reservas!",
      }),
    };
  }
}
