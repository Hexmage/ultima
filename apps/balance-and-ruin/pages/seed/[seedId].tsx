import { cva } from "cva";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { PropsWithChildren, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { Footer } from "~/components/Footer/Footer";
import { CodeBlock, Header } from "@ff6wc/ui";
import { SeedCard, SeedData } from "~/components/SeedCard/SeedCard";
import { Card } from "@ff6wc/ui";
import { setRawFlags } from "~/state/flagSlice";
import { AppHeader } from "~/components/AppHeader/AppHeader";

type PathParams = {
  seedId: string;
};

type SeedResponse = {
  data: SeedData;
  errors: string[];
  success: boolean;
};

type Props = {
  seed: SeedData;
  seedId: string;
};

export const getServerSideProps: GetServerSideProps<
  Props,
  PathParams
> = async ({ params, res }) => {
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  const { seedId } = params as PathParams;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/seed/ff6wc/${seedId}`;
  const response = await fetch(url);
  const { data: seed, errors, success }: SeedResponse = await response.json();

  return {
    props: {
      seed,
      seedId,
    },
  };
};

const REMOVE_FLAGS_FROM_LOG_REGEX = /\nFlags.+\n/g;

export default function SeedId({ seed, seedId }: Props) {
  const dispatch = useDispatch();
  const {
    flags,
    log: logWithFlags,
    created_at,
    created_by,
    hash,
    description: seedDescription,
    seed_id,
    version,
  } = seed;

  const title = `FF6WC seed ${seedId}`;

  const description = `
Version      : ${version}
Hash         : ${hash}
Created At   : ${new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "long",
  }).format(new Date(created_at * 1000))}
Created By   : ${created_by || "Unknown"}
Description  : ${seedDescription || "N/A"}
Website Seed : ${seed_id}`;
  const timestamp = new Date();

  const log = useMemo(
    // () => logWithFlags,
    () => logWithFlags.replace(REMOVE_FLAGS_FROM_LOG_REGEX, "\n"),
    [logWithFlags]
  );

  useEffect(() => {
    dispatch(setRawFlags(flags));
  }, [dispatch, flags]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppHeader />
      <div className="flex flex-col gap-6 items-center px-12 py-6">
        <Card className="max-w-[1260px]" title={"Log"}>
          <CardColumn>
            <CodeBlock>{logWithFlags}</CodeBlock>
          </CardColumn>
        </Card>

        <SeedCard seed={seed} />
      </div>
      <Footer />
    </>
  );
}
