"use client"

import { AdminDashboard } from '@/components/Admin/AdminDashboard'
import { auth } from '@/lib/firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      console.log("User", user);
      if (user) {
        setLoading(false);
      } else {
        router.push("/admin/authentication/login");
      }
    });

    return () => unsub();
  }, [router]);

  if (loading) {
    return (
      <p>Loading...</p>
    )
  }

  return (
    <div>
      <AdminDashboard />
    </div>
  )
}

export default page
