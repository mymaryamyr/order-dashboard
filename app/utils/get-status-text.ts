export function getStatusText(rank: number): string {
  switch (rank) {
    case 1:
      return "Open Order";
    case 2:
      return "Printing";
    case 3:
      return "Delivered";
    case 4:
      return "QC";
    case 5:
      return "Drying";
    case 6:
      return "Ready for Packaging";
    default:
      return "Unknown";
  }
}
