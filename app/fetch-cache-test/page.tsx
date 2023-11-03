import { Button } from "#/app/button";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const fetchRandomNumberFromApi = async () => {
  const response = await fetch(
    `${process.env.VERCEL_URL ? "https" : "http"}://${
      process.env.VERCEL_URL || "localhost:3000"
    }/api/random-number`,
    {
      next: { tags: ["random-number-fetch"], revalidate: Infinity },
    }
  );

  return response.json() as Promise<number>;
};

const RevalidateTagTest = async () => {
  const randomNumber = await fetchRandomNumberFromApi();

  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly p-24">
      <p>Stable random number: {randomNumber}</p>
      <form
        action={async () => {
          "use server";

          revalidateTag("random-number-fetch");
          redirect("/fetch-cache-test");
        }}
      >
        <button>Refresh random number</button>
      </form>
      <Button></Button>
    </main>
  );
};

export default RevalidateTagTest;
