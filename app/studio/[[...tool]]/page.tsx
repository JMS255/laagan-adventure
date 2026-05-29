'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export const dynamic = 'force-dynamic'

export default function StudioPage() {
  return (
    <>
      <style>{`.messenger-float { display: none !important; }`}</style>
      <NextStudio config={config} />
    </>
  )
}
