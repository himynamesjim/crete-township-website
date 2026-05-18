import React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface Breadcrumb {
  label: string
  href?: string
}

interface PageHeroProps {
  title: string
  description?: string
  breadcrumbs: Breadcrumb[]
}

export const PageHero: React.FC<PageHeroProps> = ({ title, description, breadcrumbs }) => {
  return (
    <div className="bg-navy-dark text-white py-12 border-b-[3px] border-gold">
      <div className="max-w-[1100px] mx-auto px-8">
        {/* Breadcrumbs */}
        <nav className="mb-4 flex items-center gap-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-gray-400">{crumb.label}</span>
              )}
              {index < breadcrumbs.length - 1 && (
                <ChevronRight className="w-4 h-4 text-gray-500" />
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Title */}
        <h1 className="text-4xl font-display font-bold mb-3">{title}</h1>

        {/* Description */}
        {description && <p className="text-lg text-gray-200">{description}</p>}
      </div>
    </div>
  )
}
