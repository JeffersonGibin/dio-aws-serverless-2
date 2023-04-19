export const chooseStatusReservationUseCase = async (input, repositories) => {
  const { findByIdDynamoDBRepository, chooseStatusReservationDynamoDBRepository } = repositories;

  const resultTaskById = await findByIdDynamoDBRepository(input?.id);

  if (resultTaskById?.status !== "PENDING") {
    return {
      status: resultTaskById?.status,
      message: "Não é possível alterar o status da reserva!",
    };
  }

  chooseStatusReservationDynamoDBRepository({
    id: input?.id,
    status: input?.status,
  });

  return {
    status: "SUCCESS",
    message: `Status Updated to ${input?.status}`,
  };
};
