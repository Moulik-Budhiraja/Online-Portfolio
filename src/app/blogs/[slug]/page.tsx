type BlogProps = {
  params: {
    slug: string;
  };
};

export default function Blog({ params }: BlogProps) {
  return (
    <div>
      <h1>{params.slug}</h1>
    </div>
  );
}
