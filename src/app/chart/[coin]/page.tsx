export default function Home({ params }: { params: { coin: string } }) {
  console.log(params);

  return <div>{params.coin} 차트</div>;
}
