export const buildSearchResultsForReservationsUseCase = async (repositories) => {
  const results = await repositories.findAllReservationsDynamoDBRepository();

  const resultItem = results.Items ?? [];
  const resultProcessed = resultItem.reduce(
    (newResult, item) => {
      if (item.status === "PENDING") {
        newResult.pending.push({
          id: item.id,
          room: item.room,
          dateStart: item.dateStart,
          dateEnd: item.dateEnd,
          responsible: item.responsible,
          status: "PENDING",
          createdAt: item.createdAt,
        });
      }

      if (item.status === "CONFIRMED") {
        newResult.confirmed.push({
          id: item.id,
          room: item.room,
          dateStart: item.dateStart,
          dateEnd: item.dateEnd,
          responsible: item.responsible,
          status: "CONFIRMED",
          createdAt: item.createdAt,
        });
      }

      if (item.status === "CANCELLED") {
        newResult.cancelled.push({
          id: item.id,
          room: item.room,
          dateStart: item.dateStart,
          dateEnd: item.dateEnd,
          responsible: item.responsible,
          status: "CANCELLED",
          createdAt: item.createdAt,
        });
      }

      if (item.status === "COMPLETED") {
        newResult.completed.push({
          id: item.id,
          room: item.room,
          dateStart: item.dateStart,
          dateEnd: item.dateEnd,
          responsible: item.responsible,
          status: "COMPLETED",
          createdAt: item.createdAt,
        });
      }

      return newResult;
    },
    {
      pending: [],
      confirmed: [],
      cancelled: [],
      completed: [],
    }
  );

  return resultProcessed;
};
