"use client";

import { ChevronDown, Search, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

const projectsData = [
  {
    id: 1,
    title: 'PixelMoviies',
    location: 'Digital',
    year: '2026',
    url: 'https://pixelmoviies.vercel.app/',
    images: [
      "/images/projects/pixel movies/2026-03-30 02_09_05-NVIDIA GeForce Overlay.png",
      "/images/projects/pixel movies/2026-03-30 02_10_44-Home - File Explorer.png"
    ]
  },
  {
    id: 2,
    title: 'Winoraagloba',
    location: 'Global',
    year: '2025',
    url: 'https://www.winoraaglobal.com/',
    images: [
      "/images/projects/winorra/2026-03-30 02_11_06-NVIDIA GeForce Overlay.png",
      "/images/projects/winorra/2026-03-30 02_11_40-Home - File Explorer.png"
    ]
  },
  {
    id: 3,
    title: 'Manan Rajkhowa',
    location: 'Portfolio',
    year: '2026',
    url: 'https://mananrajkhowa.vercel.app/',
    images: [
      "/images/projects/portfolio/2026-03-30 02_12_00-NVIDIA GeForce Overlay.png",
      "/images/projects/portfolio/2026-03-30 02_12_41-NVIDIA GeForce Overlay.png"
    ]
  }
];

export default function WorkPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = projectsData.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="work-page-layout">
      <section className="projects-container">
        
        {/* Massive Header */}
        <div className="projects-hero-header">
          <h1 className="hero-projects-title">PROJECTS</h1>
          <div className="hero-projects-count">{filteredProjects.length}</div>
        </div>
        
        {/* Filter Bar */}
        <div className="projects-filter-bar">
          <div className="filter-col">
            <span className="filter-label">All Types</span>
            <ChevronDown size={14} className="filter-icon" />
          </div>
          <div className="filter-col">
            <span className="filter-label">All Locations</span>
            <ChevronDown size={14} className="filter-icon" />
          </div>
          <div className="filter-col search">
            <input 
              type="text" 
              placeholder="Search Project" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="filter-search-input"
            />
            <Search size={14} className="filter-icon" />
          </div>
        </div>

        {/* Project List */}
        <div className="project-feed">
          {filteredProjects.map((project) => (
            <div className="p-row" key={project.id}>
              <div className="p-info">
                <h2 className="p-title">{project.title}</h2>
                
                <div className="p-meta-group">
                  <div className="p-meta">
                    <span className="m-label">LOCATION</span>
                    <span className="m-val">{project.location}</span>
                  </div>
                  <div className="p-meta">
                    <span className="m-label">YEAR FINISH</span>
                    <span className="m-val">{project.year}</span>
                  </div>
                </div>
                
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="p-link">
                  VISIT WEBSITE <ArrowUpRight size={14} />
                </a>
              </div>
              
              <div className="p-gallery">
                {project.images.map((img, i) => (
                  <div key={i} className="p-img-frame">
                    <img src={img} alt={`${project.title} ${i + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </section>
    </main>
  );
}
