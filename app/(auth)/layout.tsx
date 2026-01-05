// app/(auth)/layout.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="hidden md:block w-full md:w-1/2 h-screen bg-cover bg-center bg-[url('/image.svg')]" />
      <div className="flex-1 flex items-center justify-center p-4 md:p-0">{children}</div>
    </div>
  );
}
