interface StatusBadgeProps {
  status: "pending" | "confirmed" | "cancelled" | "rejected" | "active" | "inactive";
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const styles = {
    pending: "bg-warning/10 text-warning border-warning/20",
    confirmed: "bg-success/10 text-success border-success/20",
    cancelled: "bg-destructive/10 text-destructive border-destructive/20",
    rejected: "bg-destructive/10 text-destructive border-destructive/20",
    active: "bg-success/10 text-success border-success/20",
    inactive: "bg-muted text-muted-foreground border-border",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
