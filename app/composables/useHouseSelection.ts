export const useHouseSelection = () => {
  const selectedHouseId = useState<string | null>(
    'selectedHouseId',
    () => null
  );

  return {
    selectedHouseId,
  };
};
