import { trpc } from "./trpc";

export function HelloWorld() {
  const helloQuery = trpc.hello.useQuery();
  if (helloQuery.isPending) return <>Pending...</>;
  if (helloQuery.isError) return <>{helloQuery.error.message}</>;
  return (
    <>
      Data received:
      {helloQuery.data}
    </>
  );
}
