export default function FormItem({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="space-y-1">
      {children}
    </div>
  );
}