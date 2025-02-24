"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

export default function Home() {
  
  const router = useRouter();
  router.push('/search');
  
  return (
    <h1></h1>
  );
}
