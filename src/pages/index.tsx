import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export default function Home({ ip }: { ip?: string }) {
  return <div>Hi my ip is {ip}</div>;
}

const getIP = (context: GetServerSidePropsContext) => {
  if (!context) return undefined;
  const forwardedFor = context.req.headers['x-forwarded-for'] as string;
  if (forwardedFor) return forwardedFor.split(',')[0];
  return context.req.socket.remoteAddress;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ip = getIP(context);
  return {
    props: {
      ip,
    },
  };
};
