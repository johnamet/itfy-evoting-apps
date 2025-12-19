import React from 'react';

interface Props {
  params: { slug: string };
}

export default function EventDetailPage({ params }: Props) {
  return (
    <section className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">Event: {params.slug}</h1>
      <p className="mt-4 text-muted-foreground">Event details will be fetched from the API.</p>
    </section>
  );
}
