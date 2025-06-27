"use client";

import type React from "react";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import "./App.css"; // reuse global styles

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function ShudhitaPortfolio() {
  /* ---------- refs ---------- */
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const musicRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const heroButtonRef = useRef<HTMLButtonElement>(null);
  const typewriterRef = useRef<HTMLParagraphElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  /* ---------- GSAP ---------- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        heroRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power2.out" }
      );

      if (nameRef.current) {
        const letters = nameRef.current.textContent!.split("");
        nameRef.current.innerHTML = letters
          .map((l) =>
            l === " " ? "&nbsp;" : `<span class="letter">${l}</span>`
          )
          .join("");

        tl.fromTo(
          ".letter",
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          0.5
        );
      }

      tl.fromTo(
        heroButtonRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: "elastic.out(1,0.5)" },
        1.5
      );

      // Enhanced hero background animations
      gsap.to(".floating-notes .note", {
        y: -20,
        duration: 2,
        stagger: 0.2,
        ease: "power2.out",
        repeat: -1,
        yoyo: true,
        delay: 2,
      });

      gsap.to(".name-glow", {
        scale: 1.2,
        opacity: 0.8,
        duration: 3,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1,
      });

      gsap.fromTo(
        ".hero-tagline",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 2.5 }
      );

      // Enhanced name background animations
      gsap.fromTo(
        ".name-wave",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 0.6,
          duration: 2,
          stagger: 0.5,
          ease: "power2.out",
          delay: 1,
        }
      );

      gsap.fromTo(
        ".flowing-line",
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 0.8,
          duration: 1.5,
          stagger: 0.3,
          ease: "power2.inOut",
          delay: 1.5,
        }
      );

      gsap.fromTo(
        ".pulsing-dot",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.7)",
          delay: 2,
        }
      );

      if (typewriterRef.current) {
        gsap.to(typewriterRef.current, {
          text:
            "Music flows through my soul like gentle rivers, carrying emotions that words cannot express. " +
            "Each melody is a whisper of the heart, each harmony an embrace of comfort.",
          duration: 4,
          ease: "none",
          scrollTrigger: { trigger: typewriterRef.current, start: "top 80%" }
        });
      }

      gsap.fromTo(
        ".about-text",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.3,
          ease: "power2.out",
          scrollTrigger: { trigger: aboutRef.current, start: "top 70%" },
        }
      );

      gsap.fromTo(
        ".music-card",
        { opacity: 0, scale: 0.8, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.2)",
          scrollTrigger: { trigger: musicRef.current, start: "top 70%" },
        }
      );

      // Enhanced Gallery animations with staggered reveals and smooth parallax
      gsap.set(".gallery-item", { opacity: 0, scale: 0.8, y: 100 });

      // Main gallery entrance animation
      gsap.to(".gallery-item", {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        stagger: {
          amount: 1.5,
          from: "random",
          ease: "power2.out",
        },
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Parallax effect for gallery items on scroll
      gsap.to(".gallery-item:nth-child(odd)", {
        y: -50,
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        // Remove ease from here, as it's not a valid property for ScrollTrigger
      });

      gsap.to(".gallery-item:nth-child(even)", {
        y: 50,
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          // ease: "none",
        },
      });

      // Individual hover animations for gallery items
      document.querySelectorAll(".gallery-item").forEach((item,) => {
        const image = item.querySelector("img");
        const overlay = item.querySelector(".gallery-overlay");

        item.addEventListener("mouseenter", () => {
          gsap.to(image, { scale: 1.1, duration: 0.6, ease: "power2.out" });
          gsap.to(overlay, { opacity: 1, duration: 0.4, ease: "power2.out" });
          gsap.to(item, {
            boxShadow: "0 25px 50px rgba(216, 167, 177, 0.4)",
            y: -10,
            duration: 0.4,
            ease: "power2.out",
          });
        });

        item.addEventListener("mouseleave", () => {
          gsap.to(image, { scale: 1, duration: 0.6, ease: "power2.out" });
          gsap.to(overlay, { opacity: 0, duration: 0.4, ease: "power2.out" });
          gsap.to(item, {
            boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          });
        });
      });

      gsap.fromTo(
        ".contact-form",
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "elastic.out(1,0.8)",
          scrollTrigger: { trigger: contactRef.current, start: "top 70%" },
        }
      );

      gsap.fromTo(
        bannerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.5 }
      );
      gsap.fromTo(
        headerRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.8 }
      );
    });

    return () => ctx.revert();
  }, []);

  /* ---------- helpers ---------- */
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const scaleIn = (e: React.MouseEvent) =>
    gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2 });
  const scaleOut = (e: React.MouseEvent) =>
    gsap.to(e.currentTarget, { scale: 1, duration: 0.2 });

  /* ---------- JSX ---------- */
  return (
    <div className="portfolio-container">
      {/* Banner */}
      <div ref={bannerRef} className="banner">
        <div className="banner-overlay" />
        <p className="banner-text">
          🎵 New Release: "Nazaraan" is now available on Spotify!
          <a
            href="https://open.spotify.com/track/7aYjsaU1i3dyde8rYEzviw"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="banner-button">Listen&nbsp;Now</button>
          </a>
        </p>
      </div>

      {/* Header */}
      <header ref={headerRef} className="header">
        <nav className="nav">
          <div className="logo">Shudhita</div>
          <div className="nav-links">
            {["About", "Music", "Gallery", "Contact"].map((s) => (
              <button
                key={s}
                className="nav-link"
                onClick={() => scrollToSection(s.toLowerCase())}
                onMouseEnter={scaleIn}
                onMouseLeave={scaleOut}
              >
                {s}
              </button>
            ))}
          </div>
          <button
            className="mobile-menu"
            onMouseEnter={scaleIn}
            onMouseLeave={scaleOut}
          >
            <svg
              className="menu-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </nav>
      </header>

      {/* Hero */}
      <section ref={heroRef} className="hero">
        <div className="hero-background">
          <div className="floating-notes">
            {[...Array(12)].map((_, i) => (
              <div key={i} className={`note note-${i + 1}`}>
                {["♪", "♫", "♬", "♩", "♭", "♯"][i % 6]}
              </div>
            ))}
          </div>
          <div className="gradient-orbs">
            <div className="orb orb-1"></div>
            <div className="orb orb-2"></div>
            <div className="orb orb-3"></div>
            <div className="orb orb-4"></div>
          </div>
          <div className="hero-particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className={`particle particle-${i + 1}`}></div>
            ))}
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-name-container">
            {/* Animated Background Elements */}
            <div className="name-background">
              <div className="name-wave"></div>
              <div className="name-wave"></div>
              <div className="name-wave"></div>
              <div className="name-wave"></div>
            </div>

            <div className="name-lines">
              <div className="flowing-line"></div>
              <div className="flowing-line"></div>
              <div className="flowing-line"></div>
              <div className="flowing-line"></div>
              <div className="flowing-line"></div>
            </div>

            <div className="name-dots">
              <div className="pulsing-dot"></div>
              <div className="pulsing-dot"></div>
              <div className="pulsing-dot"></div>
              <div className="pulsing-dot"></div>
              <div className="pulsing-dot"></div>
              <div className="pulsing-dot"></div>
            </div>

            <h1 ref={nameRef} className="hero-title">
              Shudhita
            </h1>
          </div>
          <p className="hero-subtitle">
            Where melodies meet emotions, and every note tells a story
          </p>
          <div className="hero-tagline">
            <span className="tagline-accent">✨</span>
            <span>Crafting emotions through sound</span>
            <span className="tagline-accent">✨</span>
          </div>
          <a
            href="https://open.spotify.com/artist/0JefaKlCFCFu9LEzF9diAm"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <button
              ref={heroButtonRef}
              className="hero-button"
              onMouseEnter={scaleIn}
              onMouseLeave={scaleOut}
            >
              <span className="button-text">Listen Now</span>
              <svg
                className="button-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </a>
        </div>
      </section>

      {/* About */}
      <section ref={aboutRef} className="section" id="about">
        <div className="container">
          <h2 className="about-text section-title">About&nbsp;Shudhita</h2>
          <p ref={typewriterRef} className="typewriter-text" />
          <p className="about-text about-description">
            Born from silence and shaped by serenity, my music speaks the
            language of the soul. Each composition is a journey through
            landscapes of emotion, painted with gentle brush-strokes of melody.
          </p>
        </div>
      </section>

      {/* Music */}
      <section ref={musicRef} className="section music-section" id="music">
        <div className="container">
          <h2 className="section-title">Musical Journey</h2>
          <div className="music-grid">
            {[
              {
                title: "Nazraan",
                year: "25.06.2025",
                color: "D8A7B1",
                image: "music/nazraan.jpg",
              },
              {
                title: "Baarish",
                year: "2.08.2024",
                color: "A8DADC",
                image: "music/baarish.jpg",
              },
              {
                title: "Tum",
                year: "27.09.2024",
                color: "CBB4D4",
                image: "music/tumsong.jpg",
              },
              {
                title: "Javan Sirhind Nu",
                year: "25.12.2023",
                color: "F8BBD9",
                image: "music/javansirhindnu.jpg",
              },
              {
                title: "Achi Hai",
                year: "09.05.2024",
                color: "D8A7B1",
                image: "music/achihai.jpg",
              },
              {
                title: "Mulaqat",
                year: "20.05.2022",
                color: "A8DADC",
                image: "music/mulaqat.jpg",
              },
            ].map((a) => (
              <div
                key={a.title}
                className="music-card"
                onMouseEnter={scaleIn}
                onMouseLeave={scaleOut}
              >
                <div className="album-cover">
                  <img src={a.image} alt={a.title} />
                </div>
                <h3 className="album-title">{a.title}</h3>
                <p className="album-year">{a.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        ref={galleryRef}
        className="section gallery-section"
        id="gallery"
      >
        <div className="container">
          <h2 className="section-title">Visual Harmony</h2>
          <p className="gallery-subtitle">
            A collection of moments that inspire my musical journey
          </p>
          <div className="gallery-grid">
            {[
              {
                src: "images/performedatCU.jpg",
                title: "Performing at CU",
                description: "Performing at CU, where music meets passion",
              },
              {
                src: "images/onenessTalks.jpg",
                title: "Oneness Talks",
                description: "Sharing thoughts on music and life",
              },
              {
                src: "images/baarish.jpg",
                title: "Baarish",
                description: "2 August 2024",
              },
              {
                src: "images/concertatCU.jpg",
                title: "Concert at Chandigarh University",
                description: "A night of melodies and memories",
              },
              {
                src: "images/nazraan.jpg",
                title: "Nazraan",
                description: "Latest Release -25.06.2025",
              },
              {
                src: "images/tumsong.jpg",
                title: "Tum",
                description: "A song that resonates with the heart",
              },
            ].map((item, index) => (
              <div key={index} className="gallery-item">
                <div className="gallery-image-container">
                  <img src={item.src || "/placeholder.svg"} alt={item.title} />
                  <div className="gallery-overlay">
                    <div className="gallery-content">
                      <h3 className="gallery-title">{item.title}</h3>
                      <p className="gallery-description">{item.description}</p>
                      <div className="gallery-icon">
                        <svg
                          width="24"
                          height="24"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spotify */}
      <section className="section spotify-section">
        <div className="container">
          <h2 className="section-title">Listen on Spotify</h2>
          <div className="spotify-embed">
            <iframe
              src="https://open.spotify.com/embed/artist/0JefaKlCFCFu9LEzF9diAm?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section ref={contactRef} className="section" id="contact">
        <div className="container contact-container">
          <h2 className="section-title">Connect</h2>

          <form
            className="contact-form"
            action="https://formsubmit.co/YOUR_EMAIL@gmail.com" //PENDING: Replace with your email
            method="POST"
          >
            {/* Optional hidden fields */}
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="box" />

            {[
              { id: "name", label: "Name", type: "text" },
              { id: "email", label: "Email", type: "email" },
            ].map((f) => (
              <div key={f.id} className="form-group">
                <label htmlFor={f.id}>{f.label}</label>
                <input
                  id={f.id}
                  type={f.type}
                  name={f.id}
                  className="form-input"
                  required
                />
              </div>
            ))}

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="form-input form-textarea"
                required
              />
            </div>

            <button
              type="submit"
              className="form-button"
              onMouseEnter={scaleIn}
              onMouseLeave={scaleOut}
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div>
              <h3 className="footer-title">Shudhita</h3>
              <p className="footer-description">
                Creating music that touches the soul and speaks to the heart.
              </p>
              <div className="social-links">
                <a
                  href="https://www.snapchat.com/add/shudhitaaaa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Snapchat"
                >
                  {/* Snapchat */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                  >
                    <circle cx="77" cy="13" r="1" fill="#f1bc19"></circle>
                    <circle cx="50" cy="50" r="37" fill="#e6edb7"></circle>
                    <circle cx="83" cy="15" r="4" fill="#f1bc19"></circle>
                    <circle cx="87" cy="24" r="2" fill="#88ae45"></circle>
                    <circle cx="81" cy="76" r="2" fill="#fbcd59"></circle>
                    <circle cx="15" cy="63" r="4" fill="#fbcd59"></circle>
                    <circle cx="18.5" cy="51.5" r="2.5" fill="#fff"></circle>
                    <circle cx="79.5" cy="33.5" r="1.5" fill="#fff"></circle>
                    <circle cx="23" cy="83" r="2" fill="#88ae45"></circle>
                    <path
                      fill="#fbcd59"
                      d="M64.719,73H33.281C29.26,73,26,69.74,26,65.719V34.281C26,30.26,29.26,27,33.281,27h31.438	C68.74,27,72,30.26,72,34.281v31.438C72,69.74,68.74,73,64.719,73z"
                    ></path>
                    <path
                      fill="#f5e690"
                      d="M63.938,70H34.063C31.267,70,29,67.733,29,64.938V35.063C29,32.267,31.267,30,34.063,30h29.875	C66.733,30,69,32.267,69,35.063v29.875C69,67.733,66.733,70,63.938,70z"
                    ></path>
                    <path
                      fill="none"
                      stroke="#472b29"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      stroke-width="1.4"
                      d="M64.719,73H33.281C29.26,73,26,69.74,26,65.719V34.281C26,30.26,29.26,27,33.281,27h31.438C68.74,27,72,30.26,72,34.281v31.438	C72,69.74,68.74,73,64.719,73z"
                    ></path>
                    <path
                      fill="none"
                      stroke="#472b29"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      d="M29.5,53.667V35.333	c0-2.669,2.164-4.833,4.833-4.833h8"
                    ></path>
                    <path
                      fill="none"
                      stroke="#472b29"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      d="M42.583,69.5h-8.25	c-2.669,0-4.833-2.164-4.833-4.833v-4.333"
                    ></path>
                    <path
                      fill="none"
                      stroke="#472b29"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      d="M68.5,46.583v18.083	c0,2.669-2.164,4.833-4.833,4.833h-16.75"
                    ></path>
                    <path
                      fill="none"
                      stroke="#472b29"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      d="M60.917,30.5h2.75	c2.669,0,4.833,2.164,4.833,4.833v6.333"
                    ></path>
                    <line
                      x1="47.25"
                      x2="56.5"
                      y1="30.5"
                      y2="30.5"
                      fill="none"
                      stroke="#472b29"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                    ></line>
                    <path
                      fill="#fff"
                      stroke="#472b29"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      d="M49.095,64.478	l-0.249-0.006c0.011,0.003-0.051,0.006-0.114,0.006c-1.878,0-3.096-0.89-4.168-1.674c-0.678-0.493-1.317-0.962-2.005-1.08	c-1.032-0.178-2.02-0.033-2.598,0.083c-0.282,0.058-0.526,0.101-0.71,0.101c-0.642,0-0.866-0.442-0.941-0.706	c-0.085-0.303-0.142-0.588-0.199-0.866c-0.166-0.16-0.34-0.326-0.507-0.486c-2.087-0.384-3.21-0.92-3.521-1.675	c-0.048-0.118-0.076-0.239-0.082-0.361c-0.025-0.44,0.28-0.828,0.707-0.899c3.829-0.652,5.608-4.778,5.682-4.952	c0.2-0.423,0.244-0.732,0.152-0.96c-0.189-0.46-1.006-0.728-1.496-0.888c-0.172-0.057-0.323-0.107-0.442-0.156	c-1.505-0.615-1.706-1.366-1.609-1.889c0.176-0.971,1.496-1.44,2.228-1.084c0.671,0.324,1.038,0.379,1.308,0.296l0.031-0.688	c-0.127-2.082-0.088-4.553,0.588-6.116c1.993-4.617,5.591-5.134,6.837-5.134h0.668c2.287,0,4.541,0.953,5.813,2.313	c2.039,2.451,2.232,6.952,2.125,9.094l0.154,0.996c0.062,0.017,0.141,0.033,0.24,0.036c0.277-0.013,0.67-0.129,1.094-0.335	c0.574-0.28,0.995-0.152,1.346,0.002c0.596,0.217,0.999,0.709,1.007,1.245c0.015,0.666-0.52,1.227-1.586,1.663	c-0.118,0.049-0.269,0.097-0.429,0.151c-0.469,0.152-1.253,0.41-1.433,0.849c-0.09,0.214-0.045,0.508,0.13,0.875	c0.036,0.085,1.756,4.176,5.497,4.812c0.422,0.072,0.722,0.456,0.696,0.893c-0.006,0.119-0.034,0.242-0.085,0.36	c-0.317,0.77-1.522,1.309-3.787,1.685c-0.046,0.146-0.102,0.407-0.127,0.52c-0.048,0.233-0.097,0.459-0.164,0.696	c-0.091,0.317-0.295,0.541-0.572,0.637v0.052l-0.323-0.025c-0.113-0.014-0.243-0.036-0.387-0.066	c-0.679-0.137-1.593-0.242-2.599-0.072c-0.688,0.119-1.326,0.585-2.002,1.078C52.187,63.588,50.971,64.478,49.095,64.478z"
                    ></path>
                  </svg>
                </a>

                <a
                  href="https://www.instagram.com/shudhitaa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Instagram"
                >
                  {/* Instagram */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                  >
                    <path
                      fill="#c7ede6"
                      d="M87.215,56.71C88.35,54.555,89,52.105,89,49.5c0-6.621-4.159-12.257-10.001-14.478 C78.999,35.015,79,35.008,79,35c0-11.598-9.402-21-21-21c-9.784,0-17.981,6.701-20.313,15.757C36.211,29.272,34.638,29,33,29 c-7.692,0-14.023,5.793-14.89,13.252C12.906,43.353,9,47.969,9,53.5C9,59.851,14.149,65,20.5,65c0.177,0,0.352-0.012,0.526-0.022 C21.022,65.153,21,65.324,21,65.5C21,76.822,30.178,86,41.5,86c6.437,0,12.175-2.972,15.934-7.614C59.612,80.611,62.64,82,66,82 c4.65,0,8.674-2.65,10.666-6.518C77.718,75.817,78.837,76,80,76c6.075,0,11-4.925,11-11C91,61.689,89.53,58.727,87.215,56.71z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M15.405,51H5.5C5.224,51,5,50.776,5,50.5S5.224,50,5.5,50h9.905c0.276,0,0.5,0.224,0.5,0.5 S15.682,51,15.405,51z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M18.5,51h-1c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h1c0.276,0,0.5,0.224,0.5,0.5 S18.777,51,18.5,51z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M23.491,53H14.5c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h8.991c0.276,0,0.5,0.224,0.5,0.5 S23.767,53,23.491,53z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M12.5,53h-1c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h1c0.276,0,0.5,0.224,0.5,0.5 S12.777,53,12.5,53z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M9.5,53h-2C7.224,53,7,52.776,7,52.5S7.224,52,7.5,52h2c0.276,0,0.5,0.224,0.5,0.5S9.777,53,9.5,53 z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M15.5,55h-2c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h2c0.276,0,0.5,0.224,0.5,0.5 S15.776,55,15.5,55z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M18.5,46c-0.177,0-0.823,0-1,0c-0.276,0-0.5,0.224-0.5,0.5c0,0.276,0.224,0.5,0.5,0.5 c0.177,0,0.823,0,1,0c0.276,0,0.5-0.224,0.5-0.5C19,46.224,18.776,46,18.5,46z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M18.5,48c-0.177,0-4.823,0-5,0c-0.276,0-0.5,0.224-0.5,0.5c0,0.276,0.224,0.5,0.5,0.5 c0.177,0,4.823,0,5,0c0.276,0,0.5-0.224,0.5-0.5C19,48.224,18.776,48,18.5,48z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M23.5,50c-0.177,0-2.823,0-3,0c-0.276,0-0.5,0.224-0.5,0.5c0,0.276,0.224,0.5,0.5,0.5 c0.177,0,2.823,0,3,0c0.276,0,0.5-0.224,0.5-0.5C24,50.224,23.776,50,23.5,50z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M85.5,46h-10c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h10c0.276,0,0.5,0.224,0.5,0.5 S85.776,46,85.5,46z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M89.5,46h-2c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h2c0.276,0,0.5,0.224,0.5,0.5 S89.776,46,89.5,46z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M94.5,48h-10c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h10c0.276,0,0.5,0.224,0.5,0.5 S94.777,48,94.5,48z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M82.5,48h-1c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h1c0.276,0,0.5,0.224,0.5,0.5 S82.776,48,82.5,48z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M79.375,48H77.5c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h1.875c0.276,0,0.5,0.224,0.5,0.5 S79.651,48,79.375,48z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M88.5,44h-5c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h5c0.276,0,0.5,0.224,0.5,0.5 S88.777,44,88.5,44z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M85.5,50h-2c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h2c0.276,0,0.5,0.224,0.5,0.5 S85.776,50,85.5,50z"
                    ></path>
                    <path
                      fill="#fdfcef"
                      d="M43.875,32.5c0,0,3.64,0,6.125,0s4.5-2.015,4.5-4.5c0-2.333-1.782-4.229-4.055-4.455 C50.467,23.364,50.5,23.187,50.5,23c0-2.485-2.015-4.5-4.5-4.5c-1.438,0-2.703,0.686-3.527,1.736 C42.333,17.6,40.171,15.5,37.5,15.5c-2.761,0-5,2.239-5,5c0,0.446,0.077,0.87,0.187,1.282C32.045,21.005,31.086,20.5,30,20.5 c-1.781,0-3.234,1.335-3.455,3.055C26.364,23.533,26.187,23.5,26,23.5c-2.485,0-4.5,2.015-4.5,4.5s2.015,4.5,4.5,4.5s9.5,0,9.5,0 h5.375V33h3V32.5z"
                    ></path>
                    <path
                      fill="#472b29"
                      d="M37.5,15c-3.033,0-5.5,2.467-5.5,5.5c0,0.016,0,0.031,0,0.047C31.398,20.192,30.71,20,30,20 c-1.831,0-3.411,1.261-3.858,3.005C26.095,23.002,26.048,23,26,23c-2.757,0-5,2.243-5,5s2.243,5,5,5h14.875 c0.276,0,0.5-0.224,0.5-0.5s-0.224-0.5-0.5-0.5H26c-2.206,0-4-1.794-4-4s1.794-4,4-4c0.117,0,0.23,0.017,0.343,0.032l0.141,0.019 c0.021,0.003,0.041,0.004,0.062,0.004c0.246,0,0.462-0.185,0.495-0.437C27.232,22.125,28.504,21,30,21 c0.885,0,1.723,0.401,2.301,1.1c0.098,0.118,0.241,0.182,0.386,0.182c0.078,0,0.156-0.018,0.228-0.056 c0.209-0.107,0.314-0.346,0.254-0.573C33.054,21.218,33,20.852,33,20.5c0-2.481,2.019-4.5,4.5-4.5 c2.381,0,4.347,1.872,4.474,4.263c0.011,0.208,0.15,0.387,0.349,0.45c0.05,0.016,0.101,0.024,0.152,0.024 c0.15,0,0.296-0.069,0.392-0.192C43.638,19.563,44.779,19,46,19c2.206,0,4,1.794,4,4c0,0.117-0.017,0.23-0.032,0.343l-0.019,0.141 c-0.016,0.134,0.022,0.268,0.106,0.373c0.084,0.105,0.207,0.172,0.34,0.185C52.451,24.247,54,25.949,54,28c0,2.206-1.794,4-4,4 h-6.125c-0.276,0-0.5,0.224-0.5,0.5s0.224,0.5,0.5,0.5H50c2.757,0,5-2.243,5-5c0-2.397-1.689-4.413-4.003-4.877 C50.999,23.082,51,23.041,51,23c0-2.757-2.243-5-5-5c-1.176,0-2.293,0.416-3.183,1.164C42.219,16.76,40.055,15,37.5,15L37.5,15z"
                    ></path>
                    <path
                      fill="#472b29"
                      d="M36,22c-1.403,0-2.609,0.999-2.913,2.341C32.72,24.119,32.301,24,31.875,24 c-1.202,0-2.198,0.897-2.353,2.068C29.319,26.022,29.126,26,28.937,26c-1.529,0-2.811,1.2-2.918,2.732 C26.01,28.87,26.114,28.99,26.251,29c0.006,0,0.012,0,0.018,0c0.13,0,0.24-0.101,0.249-0.232c0.089-1.271,1.151-2.268,2.419-2.268 c0.229,0,0.47,0.042,0.738,0.127c0.022,0.007,0.045,0.01,0.067,0.01c0.055,0,0.11-0.02,0.156-0.054 C29.962,26.537,30,26.455,30,26.375c0-1.034,0.841-1.875,1.875-1.875c0.447,0,0.885,0.168,1.231,0.473 c0.047,0.041,0.106,0.063,0.165,0.063c0.032,0,0.063-0.006,0.093-0.019c0.088-0.035,0.148-0.117,0.155-0.212 C33.623,23.512,34.712,22.5,36,22.5c0.208,0,0.425,0.034,0.682,0.107c0.023,0.007,0.047,0.01,0.07,0.01 c0.109,0,0.207-0.073,0.239-0.182c0.038-0.133-0.039-0.271-0.172-0.309C36.517,22.04,36.256,22,36,22L36,22z"
                    ></path>
                    <path
                      fill="#472b29"
                      d="M49.883,23.5c-1.326,0-2.508,0.897-2.874,2.182c-0.038,0.133,0.039,0.271,0.172,0.309 C47.205,25.997,47.228,26,47.25,26c0.109,0,0.209-0.072,0.24-0.182C47.795,24.748,48.779,24,49.883,24 c0.117,0,0.23,0.014,0.342,0.029c0.012,0.002,0.023,0.003,0.035,0.003c0.121,0,0.229-0.092,0.246-0.217 c0.019-0.137-0.077-0.263-0.214-0.281C50.158,23.516,50.022,23.5,49.883,23.5L49.883,23.5z"
                    ></path>
                    <path
                      fill="#3231c7"
                      d="M72.3,35.7v30.6c0,3.31-2.69,6-6,6H35.7c-3.31,0-6-2.69-6-6V35.7c0-3.31,2.69-6,6-6h30.6 C69.61,29.7,72.3,32.39,72.3,35.7z"
                    ></path>
                    <path
                      fill="#7228ad"
                      d="M72.3,47.25V66.3c0,3.31-2.69,6-6,6H35.7c-3.31,0-6-2.69-6-6V35.7c0-3.31,2.69-6,6-6h19.05 C61.99,33.95,68.05,40.01,72.3,47.25z"
                    ></path>
                    <path
                      fill="#b11e93"
                      d="M70.96,70.08c-1.1,1.35-2.78,2.22-4.66,2.22H35.7c-3.31,0-6-2.69-6-6V35.7 c0-1.88,0.87-3.56,2.22-4.66C53.03,32.02,69.98,48.97,70.96,70.08z"
                    ></path>
                    <path
                      fill="#db1a58"
                      d="M63,72v0.3H35.7c-3.31,0-6-2.69-6-6V39H30C48.23,39,63,53.77,63,72z"
                    ></path>
                    <path
                      fill="#e4273e"
                      d="M55,72c0,0.1,0,0.2-0.01,0.3H35.7c-3.31,0-6-2.69-6-6V47.01C29.8,47,29.9,47,30,47 C43.81,47,55,58.19,55,72z"
                    ></path>
                    <path
                      fill="#f47c22"
                      d="M48,72c0,0.1,0,0.2-0.01,0.3H35.7c-3.31,0-6-2.69-6-6V54.01C29.8,54,29.9,54,30,54 C39.94,54,48,62.06,48,72z"
                    ></path>
                    <path
                      fill="#ef9922"
                      d="M42,72c0,0.1,0,0.2-0.01,0.3H35.7c-3.31,0-6-2.69-6-6v-6.29C29.8,60,29.9,60,30,60 C36.63,60,42,65.37,42,72z"
                    ></path>
                    <path
                      fill="#472b29"
                      d="M66.3,73H35.7c-3.694,0-6.7-3.006-6.7-6.7V35.7c0-3.694,3.006-6.7,6.7-6.7h30.6 c3.694,0,6.7,3.006,6.7,6.7v30.6C73,69.994,69.994,73,66.3,73z M35.7,30.4c-2.923,0-5.3,2.377-5.3,5.3v30.6 c0,2.922,2.377,5.3,5.3,5.3h30.6c2.923,0,5.3-2.377,5.3-5.3V35.7c0-2.922-2.377-5.3-5.3-5.3H35.7z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M50.99,66.5c-3.983,0-5.466-0.011-6.98-0.08c-1.393-0.062-2.479-0.272-3.52-0.68 c-1.014-0.391-1.806-0.906-2.57-1.67c-0.759-0.759-1.273-1.552-1.67-2.57c-0.396-1.013-0.606-2.098-0.68-3.52 c-0.069-1.527-0.08-3.008-0.08-6.98c0-3.965,0.011-5.443,0.08-6.97c0.062-1.393,0.271-2.479,0.68-3.52 c0.396-1.027,0.911-1.82,1.67-2.57c0.759-0.758,1.552-1.273,2.57-1.67c1.041-0.407,2.127-0.617,3.52-0.68 c1.566-0.071,3.067-0.09,6.98-0.09c3.915,0,5.413,0.019,6.97,0.09c1.393,0.063,2.479,0.272,3.521,0.68 c1.027,0.396,1.819,0.911,2.569,1.67c0.752,0.743,1.27,1.535,1.681,2.57c0.399,1.052,0.606,2.139,0.67,3.521 c0.07,1.581,0.09,3.08,0.09,6.97c0,3.898-0.02,5.398-0.09,6.98c-0.063,1.382-0.27,2.468-0.67,3.52 c-0.41,1.025-0.929,1.819-1.681,2.57c-0.748,0.757-1.537,1.272-2.56,1.67c-1.055,0.408-2.144,0.617-3.53,0.68 C56.445,66.489,54.965,66.5,50.99,66.5z M49.68,38.5c-2.751,0-4.262,0.021-5.573,0.079c-1.334,0.062-2.069,0.285-2.562,0.472 c-0.609,0.239-1.046,0.524-1.508,0.987c-0.461,0.46-0.746,0.895-0.982,1.499c-0.188,0.494-0.413,1.23-0.476,2.569 c-0.068,1.505-0.079,2.893-0.079,6.884c0,3.999,0.011,5.389,0.079,6.893c0.062,1.329,0.286,2.064,0.474,2.556 c0.239,0.621,0.514,1.043,0.979,1.508c0.468,0.459,0.906,0.743,1.514,0.982c0.476,0.186,1.195,0.408,2.56,0.472 c1.559,0.07,3.038,0.089,6.886,0.089c3.855,0,5.337-0.02,6.893-0.089c1.397-0.064,2.134-0.301,2.566-0.474 c0.599-0.231,1.033-0.512,1.497-0.967c0.46-0.469,0.746-0.908,0.989-1.516c0.185-0.483,0.402-1.208,0.466-2.559 c0.069-1.572,0.089-3.054,0.089-6.895c0-3.834-0.02-5.313-0.089-6.884c-0.063-1.349-0.281-2.074-0.464-2.555 c-0.236-0.612-0.52-1.049-0.979-1.508c-0.493-0.484-0.893-0.742-1.53-0.985c-0.461-0.184-1.17-0.404-2.544-0.469 c-1.534-0.07-3.017-0.089-6.895-0.089H49.68z"
                    ></path>
                    <path
                      fill="#472b29"
                      d="M50.99,35.8c3.909,0,5.405,0.019,6.956,0.09c1.359,0.061,2.415,0.265,3.428,0.66 c0.985,0.38,1.744,0.873,2.467,1.605c0.719,0.71,1.216,1.47,1.608,2.459c0.389,1.024,0.59,2.081,0.652,3.429 c0.07,1.576,0.089,3.072,0.089,6.957c0,3.893-0.019,5.39-0.089,6.966c-0.062,1.35-0.263,2.407-0.648,3.42 c-0.396,0.989-0.894,1.751-1.617,2.474c-0.716,0.725-1.473,1.219-2.453,1.6c-1.023,0.395-2.083,0.599-3.436,0.66 c-1.509,0.069-2.986,0.08-6.956,0.08c-3.978,0-5.458-0.011-6.967-0.08c-1.359-0.061-2.415-0.264-3.426-0.66 c-0.971-0.375-1.731-0.869-2.465-1.602c-0.728-0.729-1.222-1.489-1.603-2.468c-0.384-0.981-0.587-2.038-0.659-3.423 c-0.069-1.522-0.08-3.001-0.08-6.968c0-3.959,0.011-5.436,0.08-6.957c0.061-1.359,0.264-2.415,0.66-3.427 c0.38-0.985,0.873-1.745,1.603-2.465c0.727-0.727,1.488-1.221,2.467-1.602c1.009-0.394,2.065-0.598,3.424-0.66 C45.585,35.819,47.082,35.8,50.99,35.8 M50.99,63.79c3.861,0,5.345-0.019,6.907-0.089c1.443-0.067,2.211-0.314,2.658-0.493 c0.641-0.248,1.105-0.547,1.609-1.041c0.487-0.497,0.791-0.964,1.053-1.62c0.191-0.501,0.419-1.255,0.483-2.649 c0.07-1.576,0.089-3.061,0.089-6.908c0-3.839-0.019-5.322-0.089-6.898c-0.065-1.391-0.292-2.145-0.483-2.65 c-0.249-0.645-0.562-1.126-1.049-1.614c-0.518-0.509-0.96-0.794-1.625-1.048c-0.486-0.194-1.225-0.425-2.645-0.492 c-1.539-0.07-3.024-0.089-6.907-0.089H49.68c-2.756,0-4.27,0.021-5.588,0.079c-1.376,0.064-2.141,0.296-2.658,0.493 c-0.641,0.251-1.122,0.566-1.609,1.053c-0.487,0.486-0.801,0.965-1.051,1.605c-0.197,0.513-0.431,1.28-0.495,2.662 c-0.069,1.511-0.08,2.901-0.08,6.898c0,4.004,0.01,5.397,0.08,6.907c0.064,1.372,0.297,2.136,0.493,2.65 c0.252,0.654,0.556,1.121,1.05,1.615c0.491,0.482,0.973,0.795,1.613,1.046c0.496,0.194,1.247,0.426,2.656,0.492 C45.655,63.771,47.138,63.79,50.99,63.79 M50.99,35.3c-3.991,0-5.454,0.021-6.989,0.09c-1.417,0.064-2.522,0.279-3.583,0.693 c-1.047,0.408-1.86,0.937-2.639,1.714c-0.78,0.771-1.31,1.585-1.716,2.639c-0.416,1.062-0.63,2.168-0.693,3.584 c-0.069,1.537-0.08,3.019-0.08,6.979c0,3.969,0.011,5.452,0.08,6.99c0.075,1.444,0.289,2.549,0.693,3.583 c0.407,1.045,0.937,1.859,1.715,2.639c0.786,0.786,1.601,1.314,2.639,1.715c1.062,0.416,2.168,0.63,3.584,0.693 c1.537,0.07,3.02,0.081,6.989,0.081c3.96,0,5.441-0.01,6.979-0.081c1.41-0.063,2.519-0.277,3.594-0.693 c1.051-0.409,1.861-0.938,2.629-1.715c0.771-0.771,1.303-1.584,1.726-2.64c0.409-1.075,0.619-2.18,0.684-3.583 c0.068-1.536,0.09-3,0.09-6.989c0-3.979-0.021-5.443-0.09-6.979c-0.064-1.402-0.274-2.506-0.685-3.585 c-0.421-1.062-0.953-1.876-1.724-2.637c-0.771-0.78-1.584-1.309-2.639-1.716c-1.063-0.416-2.169-0.629-3.585-0.693 C56.443,35.321,54.982,35.3,50.99,35.3L50.99,35.3z M50.99,63.29c-3.842,0-5.32-0.019-6.876-0.089 c-1.336-0.062-2.036-0.278-2.496-0.458c-0.582-0.229-1-0.5-1.445-0.938c-0.441-0.441-0.705-0.846-0.934-1.438 c-0.182-0.476-0.399-1.195-0.46-2.494c-0.068-1.492-0.079-2.881-0.079-6.884c0-3.995,0.011-5.382,0.079-6.875 c0.061-1.308,0.278-2.026,0.462-2.506c0.225-0.574,0.497-0.99,0.938-1.43c0.44-0.441,0.856-0.713,1.438-0.941 c0.473-0.18,1.192-0.399,2.499-0.459C45.42,38.722,46.93,38.7,49.68,38.7h1.311c3.876,0,5.355,0.019,6.885,0.088 c1.346,0.063,2.033,0.277,2.482,0.457c0.612,0.234,0.99,0.478,1.46,0.94c0.436,0.436,0.708,0.854,0.934,1.438 c0.176,0.463,0.389,1.17,0.45,2.493c0.069,1.557,0.089,3.036,0.089,6.875c0,3.847-0.02,5.328-0.089,6.886 c-0.062,1.322-0.273,2.027-0.451,2.494c-0.234,0.586-0.501,0.996-0.943,1.448c-0.445,0.437-0.851,0.7-1.432,0.924 c-0.424,0.169-1.13,0.396-2.501,0.459C56.32,63.271,54.84,63.29,50.99,63.29L50.99,63.29z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M59.5,40.751c-0.966,0-1.75,0.783-1.75,1.749c0,0.966,0.784,1.75,1.75,1.75s1.75-0.784,1.75-1.75 S60.466,40.75,59.5,40.751L59.5,40.751z"
                    ></path>
                    <path
                      fill="#472b29"
                      d="M59.5,41c0.828,0,1.5,0.672,1.5,1.5c0,0.828-0.672,1.5-1.5,1.5S58,43.328,58,42.5 C58,41.672,58.672,41.001,59.5,41L59.5,41 M59.5,40.5L59.5,40.5c-1.103,0.001-2,0.898-2,2c0,1.103,0.897,2,2,2s2-0.897,2-2 S60.603,40.5,59.5,40.5L59.5,40.5z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M50.988,42.504c-4.695,0-8.501,3.806-8.501,8.501s3.806,8.499,8.501,8.499 c4.695,0,8.499-3.805,8.499-8.499S55.682,42.504,50.988,42.504L50.988,42.504z M50.988,45.505c3.037,0,5.5,2.462,5.5,5.5 c0,3.037-2.463,5.5-5.5,5.5c-3.038,0-5.5-2.463-5.5-5.5C45.488,47.967,47.95,45.505,50.988,45.505z"
                    ></path>
                    <path
                      fill="#472b29"
                      d="M50.988,59.754c-4.825,0-8.751-3.925-8.751-8.75c0-4.825,3.926-8.75,8.751-8.75 c4.824,0,8.749,3.925,8.749,8.75C59.737,55.829,55.812,59.754,50.988,59.754z M50.988,42.754c-4.55,0-8.251,3.701-8.251,8.25 c0,4.549,3.701,8.25,8.251,8.25c4.549,0,8.249-3.701,8.249-8.25C59.237,46.455,55.537,42.754,50.988,42.754z M50.988,56.754 c-3.171,0-5.75-2.58-5.75-5.75s2.579-5.75,5.75-5.75s5.75,2.58,5.75,5.75S54.159,56.754,50.988,56.754z M50.988,45.754 c-2.895,0-5.25,2.355-5.25,5.25s2.355,5.25,5.25,5.25s5.25-2.355,5.25-5.25S53.883,45.754,50.988,45.754z"
                    ></path>
                    <g>
                      <path
                        fill="#fdfcef"
                        d="M80.5,76.5c0,0,1.567,0,3.5,0s3.5-1.567,3.5-3.5c0-1.781-1.335-3.234-3.055-3.455 C84.473,69.366,84.5,69.187,84.5,69c0-1.933-1.567-3.5-3.5-3.5c-1.032,0-1.95,0.455-2.59,1.165 c-0.384-1.808-1.987-3.165-3.91-3.165c-2.209,0-4,1.791-4,4c0,0.191,0.03,0.374,0.056,0.558C70.128,67.714,69.592,67.5,69,67.5 c-1.228,0-2.245,0.887-2.455,2.055C66.366,69.527,66.187,69.5,66,69.5c-1.933,0-3.5,1.567-3.5,3.5s1.567,3.5,3.5,3.5s7.5,0,7.5,0 V77h7V76.5z"
                      ></path>
                      <path
                        fill="#472b29"
                        d="M82.25,72C82.112,72,82,71.888,82,71.75c0-1.223,0.995-2.218,2.218-2.218 c0.034,0.009,0.737-0.001,1.244,0.136c0.133,0.036,0.212,0.173,0.176,0.306c-0.036,0.134-0.173,0.213-0.306,0.176 c-0.444-0.12-1.1-0.12-1.113-0.118c-0.948,0-1.719,0.771-1.719,1.718C82.5,71.888,82.388,72,82.25,72z"
                      ></path>
                      <circle
                        cx="75.5"
                        cy="76.5"
                        r=".5"
                        fill="#472b29"
                      ></circle>
                      <path
                        fill="#472b29"
                        d="M84,77h-3.5c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5H84c1.654,0,3-1.346,3-3 c0-1.496-1.125-2.768-2.618-2.959c-0.134-0.018-0.255-0.088-0.336-0.196s-0.115-0.244-0.094-0.377C83.975,69.314,84,69.16,84,69 c0-1.654-1.346-3-3-3c-0.85,0-1.638,0.355-2.219,1c-0.125,0.139-0.321,0.198-0.5,0.148c-0.182-0.049-0.321-0.195-0.36-0.379 C77.58,65.165,76.141,64,74.5,64c-1.93,0-3.5,1.57-3.5,3.5c0,0.143,0.021,0.28,0.041,0.418c0.029,0.203-0.063,0.438-0.242,0.54 c-0.179,0.102-0.396,0.118-0.556-0.01C69.878,68.155,69.449,68,69,68c-0.966,0-1.792,0.691-1.963,1.644 c-0.048,0.267-0.296,0.446-0.569,0.405C66.314,70.025,66.16,70,66,70c-1.654,0-3,1.346-3,3s1.346,3,3,3h7.5 c0.276,0,0.5,0.224,0.5,0.5S73.776,77,73.5,77H66c-2.206,0-4-1.794-4-4s1.794-4,4-4c0.059,0,0.116,0.002,0.174,0.006 C66.588,67.82,67.711,67,69,67c0.349,0,0.689,0.061,1.011,0.18C70.176,64.847,72.126,63,74.5,63c1.831,0,3.466,1.127,4.153,2.774 C79.333,65.276,80.155,65,81,65c2.206,0,4,1.794,4,4c0,0.048-0.001,0.095-0.004,0.142C86.739,69.59,88,71.169,88,73 C88,75.206,86.206,77,84,77z"
                      ></path>
                      <path
                        fill="#472b29"
                        d="M78.5,76c-0.159,0-0.841,0-1,0c-0.276,0-0.5,0.224-0.5,0.5c0,0.276,0.224,0.5,0.5,0.5 c0.159,0,0.841,0,1,0c0.276,0,0.5-0.224,0.5-0.5C79,76.224,78.776,76,78.5,76z"
                      ></path>
                    </g>
                  </svg>
                </a>

                <a
                  href="https://www.youtube.com/@shudhitaa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="YouTube"
                >
                  {/* YouTube */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                  >
                    <path
                      fill="#c7ede6"
                      d="M88.704,55.677c0.3-0.616,0.566-1.264,0.796-1.943c2.633-7.77-1.349-17.078-9.733-19.325	C78.86,23.026,70.86,15.216,61.826,13.884c-10.341-1.525-19.814,5.044-22.966,15.485c-3.799-1.346-7.501-1.182-10.99,0.857	c-1.583,0.732-3.031,1.812-4.33,3.233c-1.907,2.086-3.147,4.719-3.652,7.495c-0.748,0.118-1.483,0.236-2.176,0.484	c-4.04,1.449-6.589,4.431-7.288,8.923c-0.435,2.797,0.443,5.587,0.933,6.714c1.935,4.455,6.422,6.98,10.981,6.312	c0.227-0.033,0.557,0.069,0.752,0.233c0.241,7.12,3.698,13.417,8.884,17.014c8.321,5.772,19.027,3.994,25.781-3.921	c2.894,2.96,6.338,4.398,10.384,3.876c4.023-0.519,7.147-2.739,9.426-6.349c1.053,0.283,2.051,0.691,3.083,0.804	c4.042,0.442,7.324-1.165,9.732-4.8c0.922-1.391,1.793-3.194,1.793-6.354C92.174,60.634,90.88,57.667,88.704,55.677z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M18.369,47.713H8.338c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h10.03c0.276,0,0.5,0.224,0.5,0.5	S18.645,47.713,18.369,47.713z M21.25,47.713h-1.445c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h1.445c0.276,0,0.5,0.224,0.5,0.5	S21.526,47.713,21.25,47.713z M25.304,47.713h-2.546c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h2.546c0.276,0,0.5,0.224,0.5,0.5	S25.581,47.713,25.304,47.713z M25.304,49.578h-9.616c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h9.616	c0.276,0,0.5,0.224,0.5,0.5S25.581,49.578,25.304,49.578z M13.957,49.578h-0.58c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h0.58	c0.276,0,0.5,0.224,0.5,0.5S14.233,49.578,13.957,49.578z M11.58,49.578h-1.456c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h1.456	c0.276,0,0.5,0.224,0.5,0.5S11.856,49.578,11.58,49.578z M20.715,45.848h-5.027c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h5.027	c0.276,0,0.5,0.224,0.5,0.5S20.992,45.848,20.715,45.848z M20.715,43.983h-1.258c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5	h1.258c0.276,0,0.5,0.224,0.5,0.5S20.992,43.983,20.715,43.983z M17.447,51.443h-1.759c-0.276,0-0.5-0.224-0.5-0.5	s0.224-0.5,0.5-0.5h1.759c0.276,0,0.5,0.224,0.5,0.5S17.723,51.443,17.447,51.443z M74.394,25.392h-10.03	c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h10.03c0.276,0,0.5,0.224,0.5,0.5S74.67,25.392,74.394,25.392z M77.276,25.392H75.83	c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h1.446c0.276,0,0.5,0.224,0.5,0.5S77.552,25.392,77.276,25.392z M81.33,25.392h-2.546	c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h2.546c0.276,0,0.5,0.224,0.5,0.5S81.606,25.392,81.33,25.392z M81.33,27.257h-9.616	c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h9.616c0.276,0,0.5,0.224,0.5,0.5S81.606,27.257,81.33,27.257z M69.982,27.257h-0.58	c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h0.58c0.276,0,0.5,0.224,0.5,0.5S70.258,27.257,69.982,27.257z M67.605,27.257h-1.456	c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h1.456c0.276,0,0.5,0.224,0.5,0.5S67.881,27.257,67.605,27.257z M76.741,23.527	h-5.027c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h5.027c0.276,0,0.5,0.224,0.5,0.5S77.017,23.527,76.741,23.527z M76.741,21.662h-1.257c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h1.257c0.276,0,0.5,0.224,0.5,0.5S77.017,21.662,76.741,21.662	z M73.472,29.122h-1.759c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h1.759c0.276,0,0.5,0.224,0.5,0.5	S73.749,29.122,73.472,29.122z"
                    ></path>
                    <path
                      fill="#fdfcef"
                      d="M75.965,48.546c0,0,10.616,0,10.681,0c2.452,0,4.439-1.987,4.439-4.439	c0-2.139-1.513-3.924-3.527-4.344c0.023-0.187,0.039-0.377,0.039-0.57c0-2.539-2.058-4.598-4.597-4.598	c-1.499,0-2.827,0.721-3.666,1.831c-0.215-2.826-2.739-5.007-5.693-4.646c-2.16,0.264-3.947,1.934-4.344,4.073	c-0.127,0.686-0.114,1.352,0.013,1.977c-0.579-0.624-1.403-1.016-2.322-1.016c-1.68,0-3.052,1.308-3.16,2.961	c-0.763-0.169-1.593-0.158-2.467,0.17c-1.671,0.627-2.861,2.2-2.93,3.983c-0.099,2.533,1.925,4.617,4.435,4.617	c0.191,0,0.861,0,1.015,0h9.218"
                    ></path>
                    <path
                      fill="#472b29"
                      d="M86.646,49.046H75.965c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h10.681	c2.172,0,3.938-1.767,3.938-3.939c0-1.854-1.315-3.476-3.129-3.855c-0.254-0.053-0.425-0.291-0.394-0.549	c0.02-0.168,0.035-0.337,0.035-0.511c0-2.259-1.838-4.098-4.098-4.098c-1.292,0-2.483,0.595-3.267,1.632	c-0.126,0.166-0.343,0.237-0.54,0.179c-0.2-0.059-0.342-0.235-0.358-0.442c-0.094-1.238-0.7-2.401-1.663-3.191	c-0.973-0.797-2.206-1.148-3.471-0.997c-1.946,0.238-3.556,1.747-3.913,3.668c-0.111,0.599-0.107,1.2,0.012,1.786	c0.044,0.22-0.062,0.442-0.262,0.544c-0.197,0.103-0.441,0.061-0.595-0.104c-0.513-0.552-1.207-0.856-1.955-0.856	c-1.4,0-2.569,1.095-2.661,2.494c-0.01,0.146-0.082,0.28-0.199,0.367c-0.116,0.087-0.269,0.118-0.407,0.088	c-0.754-0.167-1.471-0.118-2.184,0.15c-1.499,0.562-2.547,1.983-2.606,3.535c-0.043,1.083,0.347,2.11,1.097,2.889	c0.749,0.779,1.758,1.208,2.839,1.208h10.233c0.276,0,0.5,0.224,0.5,0.5s-0.224,0.5-0.5,0.5H62.866c-1.355,0-2.62-0.538-3.56-1.516	c-0.94-0.977-1.429-2.263-1.376-3.621c0.076-1.949,1.384-3.73,3.255-4.432c0.72-0.27,1.462-0.363,2.221-0.279	c0.362-1.655,1.842-2.884,3.582-2.884c0.603,0,1.193,0.151,1.72,0.432c0.004-0.328,0.036-0.656,0.098-0.984	c0.436-2.346,2.398-4.188,4.774-4.478c1.532-0.192,3.039,0.244,4.226,1.216c0.899,0.737,1.544,1.742,1.847,2.851	c0.919-0.807,2.095-1.256,3.348-1.256c2.811,0,5.098,2.287,5.098,5.098c0,0.064-0.002,0.128-0.005,0.192	c2.048,0.628,3.492,2.547,3.492,4.723C91.585,46.83,89.369,49.046,86.646,49.046z"
                    ></path>
                    <path
                      fill="#fdfcef"
                      d="M72.392,38.767c-1.642-0.108-3.055,1.026-3.157,2.533c-0.013,0.187-0.004,0.371,0.023,0.55	c-0.317-0.358-0.786-0.6-1.324-0.636c-0.985-0.065-1.836,0.586-1.959,1.471c-0.179-0.049-0.366-0.082-0.56-0.095	c-1.437-0.094-2.674,0.898-2.762,2.216"
                    ></path>
                    <path
                      fill="#472b29"
                      d="M62.654,45.057c-0.006,0-0.011,0-0.017,0c-0.138-0.009-0.242-0.128-0.232-0.266	c0.099-1.453,1.455-2.552,3.027-2.449c0.118,0.008,0.235,0.022,0.354,0.044c0.26-0.878,1.168-1.49,2.166-1.42	c0.376,0.025,0.729,0.139,1.034,0.33c0-0.004,0-0.008,0.001-0.012c0.11-1.641,1.624-2.88,3.422-2.765	c0.138,0.009,0.242,0.128,0.232,0.266c-0.008,0.137-0.104,0.245-0.266,0.233c-1.514-0.102-2.798,0.933-2.891,2.3	c-0.011,0.164-0.004,0.331,0.021,0.497c0.017,0.109-0.041,0.217-0.142,0.263c-0.102,0.045-0.219,0.022-0.293-0.061	c-0.284-0.321-0.704-0.522-1.152-0.552c-0.849-0.046-1.589,0.497-1.694,1.256c-0.011,0.071-0.05,0.134-0.11,0.174	s-0.132,0.053-0.203,0.033c-0.176-0.047-0.343-0.076-0.512-0.086c-1.305-0.093-2.416,0.805-2.496,1.983	C62.894,44.956,62.785,45.057,62.654,45.057z"
                    ></path>
                    <path
                      fill="#fdfcef"
                      d="M87.443,40.283c-1.543-0.727-3.327-0.213-3.985,1.15c-0.082,0.169-0.142,0.344-0.182,0.521"
                    ></path>
                    <path
                      fill="#472b29"
                      d="M84.275,42.204c-0.019,0-0.037-0.002-0.057-0.006c-0.134-0.031-0.218-0.166-0.187-0.3	c0.046-0.201,0.114-0.394,0.201-0.574c0.715-1.484,2.653-2.054,4.316-1.268c0.125,0.059,0.179,0.208,0.12,0.333	c-0.06,0.126-0.21,0.177-0.333,0.12c-1.421-0.67-3.057-0.204-3.653,1.033c-0.071,0.146-0.127,0.304-0.165,0.468	C84.492,42.126,84.389,42.204,84.275,42.204z"
                    ></path>
                    <path
                      fill="#472b29"
                      d="M69.293,47.488c-0.193,0-0.35-0.157-0.35-0.35v-2.503c0-0.193,0.156-0.35,0.35-0.35	s0.35,0.157,0.35,0.35v2.503C69.642,47.331,69.486,47.488,69.293,47.488z M69.293,43.734c-0.193,0-0.35-0.157-0.35-0.35v-1.251	c0-0.193,0.156-0.35,0.35-0.35s0.35,0.157,0.35,0.35v1.251C69.642,43.577,69.486,43.734,69.293,43.734z"
                    ></path>
                    <path
                      fill="#ee3e54"
                      d="M74.938,40.461c0,0-0.45-3.381-1.828-4.872c-1.749-1.952-3.71-1.963-4.609-2.075	c-6.437-0.499-16.091-0.499-16.091-0.499h-0.022c0,0-9.654,0-16.091,0.499c-0.899,0.11-2.858,0.121-4.609,2.075	c-1.378,1.488-1.828,4.872-1.828,4.872s-0.461,3.968-0.461,7.936v3.721c0,3.97,0.461,7.939,0.461,7.939s0.45,3.381,1.828,4.868	c1.751,1.952,4.047,1.893,5.072,2.098c3.68,0.375,15.639,0.492,15.639,0.492s9.665-0.018,16.102-0.51	c0.899-0.115,2.858-0.126,4.609-2.077c1.378-1.486,1.828-4.868,1.828-4.868s0.461-3.968,0.461-7.939V48.4	C75.396,44.429,74.938,40.461,74.938,40.461z"
                    ></path>
                    <path
                      fill="#fdfcee"
                      d="M48.784,42.375v12.001l10-6L48.784,42.375z"
                    ></path>
                    <path
                      fill="#472b29"
                      d="M52.42,61.941c-3.005,0-4.734-2.311-4.806-2.408c-0.327-0.445-0.23-1.071,0.215-1.398	c0.446-0.328,1.071-0.229,1.397,0.215c0.046,0.06,1.22,1.591,3.194,1.591c1.972,0,3.182-1.575,3.193-1.592	c0.327-0.444,0.952-0.541,1.398-0.215c0.445,0.327,0.541,0.953,0.215,1.398C57.154,59.63,55.425,61.941,52.42,61.941z"
                    ></path>
                    <circle
                      cx="42.317"
                      cy="55.636"
                      r="2.5"
                      fill="#1f212b"
                    ></circle>
                    <circle cx="42.317" cy="54.636" r="1" fill="#fff"></circle>
                    <circle
                      cx="62.317"
                      cy="55.636"
                      r="2.5"
                      fill="#1f212b"
                    ></circle>
                    <circle cx="62.317" cy="54.636" r="1" fill="#fff"></circle>
                    <path
                      fill="#472b29"
                      d="M52.41,33.014c0,0,9.654,0,16.091,0.499c0.899,0.112,2.86,0.124,4.609,2.075 c1.378,1.491,1.828,4.872,1.828,4.872s0.459,3.968,0.461,7.939v3.721c0,3.97-0.461,7.939-0.461,7.939s-0.45,3.381-1.828,4.868 c-1.751,1.952-3.71,1.963-4.609,2.077c-6.437,0.492-16.102,0.51-16.102,0.51S40.44,67.397,36.76,67.022 c-1.025-0.205-3.321-0.146-5.072-2.098c-1.378-1.486-1.828-4.868-1.828-4.868s-0.461-3.968-0.461-7.939v-3.721 c0-3.968,0.461-7.936,0.461-7.936s0.45-3.384,1.828-4.872c1.751-1.954,3.71-1.965,4.609-2.075 c6.437-0.499,16.091-0.499,16.091-0.499H52.41 M52.41,31.614h-0.022c-0.097,0-9.783,0.006-16.199,0.503l-0.031,0.002l-0.031,0.004 c-0.076,0.009-0.161,0.018-0.254,0.027c-1.065,0.107-3.28,0.331-5.228,2.503c-1.618,1.747-2.121,5.231-2.173,5.622 c-0.022,0.188-0.473,4.118-0.473,8.121v3.721c0,4.005,0.451,7.935,0.47,8.1c0.055,0.414,0.558,3.896,2.192,5.658 c1.785,1.99,4.068,2.283,5.295,2.441c0.203,0.026,0.382,0.048,0.53,0.077l0.065,0.013l0.066,0.007 c3.702,0.378,15.277,0.495,15.767,0.5c0.113,0,9.808-0.024,16.223-0.514l0.035-0.003l0.035-0.004 c0.079-0.01,0.167-0.019,0.262-0.029c1.062-0.111,3.272-0.341,5.211-2.502c1.618-1.745,2.122-5.227,2.174-5.618 c0.022-0.188,0.473-4.118,0.473-8.123v-3.721c-0.002-4.005-0.451-7.934-0.47-8.099c-0.055-0.415-0.558-3.896-2.191-5.662 c-1.927-2.15-4.141-2.377-5.205-2.486c-0.094-0.01-0.181-0.018-0.258-0.028L68.64,32.12l-0.033-0.003 C62.192,31.62,52.507,31.614,52.41,31.614L52.41,31.614z"
                    ></path>
                    <path
                      fill="#fdfcef"
                      d="M26.98,73.496h7.934c0.133,0,0.71,0,0.874,0c2.161,0,3.903-1.756,3.818-3.889 c-0.06-1.503-1.084-2.828-2.522-3.356c-0.752-0.276-1.466-0.285-2.123-0.143c-0.093-1.392-1.274-2.494-2.72-2.494 c-0.79,0-1.5,0.331-1.998,0.856c0.109-0.526,0.121-1.087,0.011-1.665c-0.342-1.802-1.88-3.208-3.739-3.431 c-2.542-0.305-4.715,1.532-4.9,3.913c-0.722-0.936-1.865-1.543-3.155-1.543c-2.185,0-3.957,1.734-3.957,3.873 c0,0.163,0.014,0.322,0.034,0.48c-1.733,0.355-3.035,1.858-3.035,3.66c0,2.065,1.711,3.739,3.821,3.739c0.023,0,1.657,0,3.54,0 M24.98,73.496h0.36"
                    ></path>
                    <path
                      fill="#472b29"
                      d="M11.003,69.756c0-1.85,1.239-3.483,3.003-4.038c-0.001-0.035-0.001-0.069-0.001-0.103 c0-2.411,1.999-4.373,4.457-4.373c1.056,0,2.051,0.359,2.842,1.007c0.268-0.893,0.798-1.689,1.546-2.302 c1.041-0.853,2.361-1.238,3.726-1.071c2.074,0.248,3.789,1.824,4.17,3.833c0.046,0.243,0.074,0.485,0.083,0.727 c0.437-0.21,0.921-0.323,1.414-0.323c1.506,0,2.791,1.028,3.135,2.424c0.64-0.06,1.27,0.019,1.88,0.244 c1.637,0.602,2.782,2.131,2.849,3.806c0.046,1.149-0.37,2.242-1.173,3.078c-0.813,0.846-1.959,1.331-3.144,1.331h-8.807 c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h8.807c0.927,0,1.788-0.364,2.423-1.024c0.612-0.637,0.93-1.47,0.895-2.346 c-0.051-1.274-0.933-2.442-2.195-2.905c-0.603-0.223-1.207-0.263-1.846-0.125c-0.142,0.031-0.29-0.002-0.406-0.089 c-0.116-0.088-0.188-0.22-0.198-0.366c-0.076-1.136-1.052-2.027-2.221-2.027c-0.626,0-1.207,0.249-1.635,0.7 c-0.154,0.163-0.397,0.202-0.594,0.1c-0.198-0.104-0.303-0.326-0.258-0.545c0.1-0.482,0.103-0.977,0.009-1.472 c-0.301-1.585-1.661-2.83-3.307-3.027c-1.088-0.126-2.144,0.173-2.973,0.853c-0.804,0.66-1.29,1.584-1.369,2.604 c-0.016,0.206-0.157,0.38-0.355,0.44c-0.198,0.057-0.413-0.01-0.539-0.174c-0.662-0.858-1.668-1.349-2.76-1.349 c-1.906,0-3.457,1.513-3.457,3.373c0,0.142,0.012,0.28,0.03,0.417c0.033,0.26-0.14,0.501-0.396,0.554 c-1.528,0.312-2.636,1.646-2.636,3.17c0,1.786,1.49,3.239,3.321,3.239h3.54c0.276,0,0.5,0.224,0.5,0.5s-0.224,0.5-0.5,0.5h-3.54 C12.94,73.997,11.002,72.095,11.003,69.756z M24.48,73.497c0-0.276,0.224-0.5,0.5-0.5h0.36c0.276,0,0.5,0.224,0.5,0.5 s-0.224,0.5-0.5,0.5h-0.36C24.704,73.997,24.48,73.773,24.48,73.497z"
                    ></path>
                    <path
                      fill="#472b29"
                      d="M17.03,68.193c0.018,0,0.036-0.002,0.055-0.006c0.135-0.03,0.22-0.164,0.189-0.299 c-0.037-0.164-0.094-0.325-0.17-0.479c-0.604-1.224-2.272-1.677-3.722-1.007c-0.125,0.058-0.18,0.206-0.122,0.331 c0.058,0.126,0.207,0.179,0.332,0.122c1.201-0.556,2.577-0.208,3.063,0.774c0.058,0.118,0.102,0.242,0.13,0.367 C16.812,68.114,16.915,68.193,17.03,68.193z"
                    ></path>
                    <path
                      fill="#472b29"
                      d="M22.189,73.997h1.107c0.276,0,0.5-0.224,0.5-0.5s-0.224-0.5-0.5-0.5h-1.107 c-0.276,0-0.5,0.224-0.5,0.5S21.912,73.997,22.189,73.997z"
                    ></path>
                    <path
                      fill="#472b29"
                      d="M48.784,54.876c-0.085,0-0.17-0.021-0.247-0.064c-0.157-0.089-0.253-0.256-0.253-0.436V42.375	c0-0.18,0.097-0.346,0.254-0.435c0.157-0.088,0.35-0.085,0.503,0.006l10,6.001c0.151,0.09,0.243,0.253,0.243,0.429	s-0.092,0.338-0.243,0.429l-10,6C48.962,54.853,48.873,54.876,48.784,54.876z M49.284,43.258v10.235l8.528-5.117L49.284,43.258z"
                    ></path>
                  </svg>
                </a>

                <a
                  href="https://open.spotify.com/artist/0JefaKlCFCFu9LEzF9diAm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Spotify"
                >
                  {/* Spotify */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="100"
                    height="100"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#71c598"
                      d="M25.912,3.584c-5.156,0.124-7.375,0.841-10.887,2.013c-1.384,0.462-2.21,1.161-3.421,1.975	c-1.438,0.966-3.187,2.914-4.166,4.343c-4.159,6.073-4.983,14.373-1.778,21c1.88,3.886,5.031,7.195,8.95,9.005	c3.975,1.836,7.577,2.716,11.929,2.232c4.19-0.466,4.947-0.873,8.089-2.793c0.867-0.53,2.48-1.787,3.142-2.558	c0.803-0.934,2.89-3.095,3.55-4.135c2.328-3.666,3.015-6.388,2.972-12.017c-0.014-1.778-0.525-3.887-1.096-5.571	c-1.163-3.432-2.292-5.975-5.206-8.128c-3.211-2.373-5.161-4.574-12.102-5.375"
                    ></path>
                    <path
                      fill="#010101"
                      d="M24.212,44.785c-3.191,0-6.246-0.764-9.812-2.411c-3.919-1.811-7.183-5.092-9.19-9.241	c-3.246-6.711-2.533-15.149,1.816-21.5c0.999-1.459,2.797-3.465,4.3-4.476c0.235-0.158,0.456-0.312,0.669-0.461	c0.908-0.633,1.692-1.179,2.873-1.573c3.421-1.142,5.69-1.898,10.911-2.036c0.054-0.012,0.111-0.014,0.167-0.009	c6.16,0.711,8.462,2.488,11.127,4.546c0.393,0.303,0.793,0.612,1.215,0.924c3.141,2.321,4.296,5.164,5.383,8.37	c0.412,1.217,1.105,3.579,1.122,5.728c0.043,5.668-0.669,8.54-3.05,12.289c-0.49,0.773-1.681,2.079-2.638,3.129	c-0.382,0.42-0.724,0.794-0.956,1.064c-0.733,0.854-2.42,2.145-3.26,2.658c-3.205,1.959-4.032,2.391-8.296,2.863	C25.785,44.739,24.994,44.785,24.212,44.785z M25.931,4.084c-0.002,0-0.004,0-0.007,0c-5.157,0.125-7.378,0.866-10.74,1.988	c-1.044,0.348-1.739,0.832-2.618,1.444c-0.217,0.152-0.443,0.309-0.683,0.471c-1.398,0.94-3.087,2.829-4.032,4.21	c-4.15,6.061-4.833,14.106-1.741,20.5c1.906,3.941,4.999,7.056,8.709,8.769c4.264,1.971,7.751,2.624,11.664,2.189	c4.062-0.45,4.776-0.822,7.885-2.723c0.871-0.533,2.414-1.748,3.023-2.457c0.236-0.275,0.585-0.657,0.976-1.086	c0.881-0.967,2.088-2.291,2.532-2.99c2.286-3.603,2.936-6.237,2.894-11.746c-0.012-1.468-0.401-3.44-1.069-5.415	c-1.068-3.151-2.117-5.733-5.029-7.886c-0.428-0.316-0.834-0.63-1.232-0.937C33.929,6.46,31.739,4.771,25.931,4.084z"
                    ></path>
                    <path
                      fill="#d6e5e5"
                      d="M22.929,27.838c-2.716-0.138-2.342-0.062-5.169,0.193c-0.965,0.087-1.967,0.253-2.928,0.372	c-0.647,0.08-1.326,0.173-1.846,0.567c-0.52,0.393-0.791,1.194-0.397,1.713c0.364,0.479,1.071,0.549,1.667,0.469	c3.921-0.527,5.509-0.682,9.002-0.637c1.526,0.02,4.506,0.769,5.886,1.42c0.934,0.44,2.731,1.312,3.262,1.494	c0.697,0.238,1.201-0.399,1.363-0.937c0.148-0.491-0.323-0.988-0.639-1.252c-2.418-2.023-7.048-3.14-10.19-3.406"
                    ></path>
                    <path
                      fill="#d6e5e5"
                      d="M24.471,24.527c-1.434-0.407-2.565-0.288-3.803-0.26c-0.656,0.015-2.594,0.178-3.238,0.307	c-1.562,0.312-1.997,0.42-3.559,0.732c-0.36,0.072-0.728,0.144-1.093,0.098c-0.594-0.075-1.134-0.488-1.363-1.042	c-0.078-0.188-0.121-0.401-0.06-0.595c0.08-0.254,0.073-0.851,0.883-1.153c3.186-1.185,4.792-1.124,7.516-1.324	c3.498-0.256,5.457,0.393,8.136,0.926c1.751,0.348,3.585,1.101,5.257,1.728c1.279,0.479,2.409,0.881,2.669,2.043	c0.082,0.368-0.024,1.064-0.275,1.346c-0.175,0.196-0.335,0.42-0.594,0.463c-0.83,0.139-1.603-0.388-2.385-0.697	c-0.535-0.211-1.46-0.549-1.998-0.755c-1.724-0.66-3.123-1.179-6.137-1.819"
                    ></path>
                    <path
                      fill="#d6e5e5"
                      d="M24.634,18.143c-3.739-0.572-7.626-0.157-11.299,0.749c-0.453,0.112-0.91,0.235-1.376,0.223	c-0.466-0.012-0.952-0.182-1.232-0.555c-0.24-0.32-0.425-0.593-0.473-0.99c-0.036-0.3,0.06-0.764,0.195-1.034	c0.109-0.217,0.312-0.37,0.515-0.504c1.055-0.697,2.299-1.105,3.562-1.17c0.749-0.038,1.578-0.332,2.324-0.401	c0.678-0.063,2.676-0.278,3.357-0.251c3.683,0.15,3.407-0.15,7.095,0.311c0.611,0.076,1.725,0.374,2.329,0.492	c1.062,0.207,1.414,0.274,2.433,0.638c0.992,0.354,1.545,0.437,2.079,0.685c0.604,0.281,1.476,0.599,2.061,0.918	c1.369,0.746,1.57,0.695,2.399,1.582c0.724,0.774,0.249,1.991-0.142,2.364c-0.223,0.213-0.424,0.299-0.718,0.392	c-0.997,0.318-2.069-0.078-3.029-0.495c-2.248-0.977-4.478-2.116-6.906-2.446c-0.969-0.131-1.729-0.333-3.15-0.508"
                    ></path>
                    <path
                      fill="#010101"
                      d="M32.703,33.979c-0.151,0-0.306-0.026-0.459-0.079c-0.455-0.154-1.695-0.744-2.691-1.218l-0.622-0.296	c-1.378-0.649-4.297-1.354-5.679-1.372c-3.378-0.043-4.939,0.096-8.93,0.632c-0.938,0.13-1.716-0.114-2.131-0.661	c-0.233-0.307-0.33-0.702-0.274-1.114c0.069-0.502,0.356-0.988,0.767-1.3c0.643-0.485,1.443-0.585,2.086-0.664	c0.342-0.042,0.688-0.091,1.037-0.14c0.638-0.089,1.28-0.178,1.908-0.234c0.606-0.055,1.064-0.101,1.437-0.139	c1.369-0.138,1.627-0.165,3.733-0.059c0.032-0.003,0.065-0.003,0.098-0.001c3.467,0.293,8.048,1.495,10.47,3.521	c0.686,0.573,0.969,1.206,0.796,1.779c-0.16,0.531-0.508,0.977-0.93,1.193C33.122,33.928,32.915,33.979,32.703,33.979z M22.171,30.006c0.345,0,0.708,0.003,1.093,0.008c1.649,0.021,4.728,0.824,6.092,1.468l0.626,0.297	c0.922,0.438,2.184,1.039,2.585,1.175c0.107,0.037,0.198,0.033,0.294-0.016c0.178-0.091,0.351-0.329,0.43-0.592	c0.045-0.151-0.152-0.449-0.48-0.724c-2.226-1.861-6.645-3.004-9.842-3.286c-0.021,0.002-0.043,0.003-0.065,0.001	c-2.094-0.105-2.301-0.085-3.651,0.052c-0.376,0.038-0.837,0.085-1.448,0.14c-0.611,0.055-1.238,0.143-1.859,0.229	c-0.354,0.049-0.706,0.098-1.052,0.141c-0.552,0.068-1.178,0.146-1.606,0.47c-0.197,0.149-0.347,0.4-0.379,0.639	c-0.021,0.15,0.006,0.276,0.079,0.372c0.28,0.367,0.99,0.302,1.203,0.276C17.783,30.172,19.436,30.006,22.171,30.006z"
                    ></path>
                    <path
                      fill="#010101"
                      d="M34.669,28.319c-0.638,0-1.221-0.271-1.746-0.515c-0.182-0.084-0.362-0.168-0.545-0.24	c-0.316-0.124-0.771-0.294-1.199-0.454l-0.794-0.299c-1.605-0.614-2.991-1.146-6.062-1.796c-0.046-0.01-0.089-0.025-0.129-0.047	c-1.079-0.282-1.989-0.252-2.951-0.219l-0.564,0.017c-0.648,0.015-2.547,0.177-3.152,0.297c-0.767,0.153-1.262,0.258-1.752,0.361	c-0.508,0.106-1.011,0.213-1.806,0.371c-0.375,0.076-0.803,0.162-1.253,0.104c-0.774-0.098-1.465-0.627-1.762-1.348	c-0.139-0.336-0.164-0.651-0.074-0.937c0.094-0.428,0.244-1.12,1.186-1.47c2.804-1.043,4.462-1.148,6.561-1.281	c0.347-0.021,0.708-0.045,1.092-0.073c2.94-0.213,4.855,0.201,6.884,0.643c0.447,0.097,0.905,0.196,1.387,0.292	c1.528,0.304,3.076,0.892,4.573,1.461l0.762,0.289c1.351,0.506,2.667,0.999,2.98,2.401c0.115,0.511-0.018,1.371-0.392,1.789	c-0.236,0.273-0.479,0.555-0.883,0.622C34.907,28.31,34.787,28.319,34.669,28.319z M24.667,24.066	c3.052,0.653,4.456,1.19,6.076,1.812l0.787,0.296c0.434,0.162,0.895,0.334,1.216,0.461c0.199,0.078,0.399,0.171,0.599,0.263	c0.537,0.25,1.044,0.483,1.521,0.405c0.048-0.008,0.158-0.136,0.23-0.22l0.071-0.081c0.113-0.128,0.221-0.643,0.162-0.904	c-0.187-0.833-0.987-1.172-2.278-1.656l-0.844-0.318c-1.458-0.555-2.966-1.129-4.413-1.416c-0.487-0.097-0.95-0.197-1.403-0.296	c-2.042-0.442-3.804-0.825-6.599-0.621c-0.388,0.028-0.752,0.051-1.103,0.073c-2.096,0.133-3.61,0.229-6.276,1.221	c-0.428,0.159-0.477,0.386-0.534,0.648c-0.015,0.071-0.03,0.134-0.046,0.186c-0.006,0.02-0.021,0.095,0.044,0.253	c0.16,0.389,0.547,0.685,0.963,0.737c0.287,0.033,0.616-0.029,0.932-0.093c0.791-0.157,1.291-0.263,1.796-0.369	c0.494-0.104,0.991-0.209,1.763-0.363c0.667-0.133,2.643-0.301,3.325-0.316l0.553-0.017c1.035-0.035,2.107-0.07,3.398,0.295	C24.627,24.051,24.647,24.059,24.667,24.066z"
                    ></path>
                    <path
                      fill="#010101"
                      d="M36.972,22.208c-0.859,0-1.702-0.326-2.455-0.652c-0.361-0.157-0.722-0.318-1.083-0.479	c-1.83-0.817-3.723-1.662-5.691-1.93c-0.415-0.057-0.793-0.125-1.199-0.199c-0.533-0.099-1.118-0.205-1.914-0.304	c-0.023,0-0.047-0.002-0.07-0.006c-3.32-0.51-7.055-0.259-11.104,0.74l-0.103,0.025c-0.447,0.11-0.906,0.23-1.406,0.212	c-0.681-0.018-1.271-0.292-1.618-0.755c-0.275-0.367-0.507-0.714-0.569-1.23c-0.046-0.382,0.06-0.948,0.245-1.318	c0.162-0.322,0.438-0.533,0.687-0.697c1.136-0.749,2.454-1.182,3.811-1.251c0.359-0.019,0.75-0.105,1.165-0.197	c0.374-0.082,0.761-0.168,1.139-0.203l0.45-0.043c1.202-0.117,2.422-0.229,2.975-0.209c1.384,0.058,2.219,0.048,2.89,0.043	c1.161-0.011,1.925-0.019,4.246,0.271c0.412,0.052,1.022,0.193,1.561,0.318c0.302,0.07,0.586,0.136,0.802,0.179	c1.076,0.209,1.464,0.284,2.506,0.657c0.442,0.157,0.795,0.26,1.097,0.348c0.376,0.11,0.701,0.204,1.025,0.355	c0.223,0.104,0.484,0.212,0.753,0.324c0.468,0.195,0.951,0.397,1.337,0.608c0.334,0.182,0.598,0.315,0.817,0.428	c0.703,0.356,1.023,0.52,1.708,1.25c0.946,1.012,0.396,2.535-0.163,3.068c-0.284,0.271-0.549,0.392-0.91,0.507	C37.589,22.167,37.279,22.208,36.972,22.208z M24.673,17.644c0.015,0.001,0.031,0.002,0.046,0.004	c0.836,0.102,1.447,0.214,2.004,0.315c0.391,0.072,0.754,0.139,1.153,0.193c2.111,0.286,4.069,1.16,5.964,2.007	c0.358,0.159,0.716,0.319,1.074,0.475c0.855,0.373,1.839,0.744,2.678,0.478c0.248-0.079,0.375-0.135,0.524-0.277	c0.229-0.218,0.624-1.126,0.123-1.661c-0.563-0.602-0.765-0.704-1.431-1.042c-0.227-0.115-0.498-0.254-0.843-0.441	c-0.341-0.187-0.8-0.378-1.243-0.563c-0.282-0.117-0.556-0.231-0.789-0.34c-0.256-0.119-0.533-0.2-0.884-0.302	c-0.317-0.093-0.688-0.201-1.153-0.367c-0.972-0.347-1.312-0.413-2.322-0.61c-0.266-0.052-0.561-0.12-0.876-0.193	c-0.514-0.119-1.097-0.255-1.458-0.3c-2.255-0.281-2.995-0.275-4.112-0.264c-0.683,0.006-1.531,0.015-2.941-0.043	c-0.526-0.028-2.029,0.124-2.835,0.204l-0.455,0.044c-0.315,0.029-0.655,0.104-1.015,0.184c-0.437,0.097-0.887,0.196-1.33,0.219	c-1.179,0.061-2.324,0.437-3.312,1.088c-0.139,0.092-0.288,0.2-0.344,0.312c-0.098,0.194-0.168,0.56-0.146,0.75	c0.03,0.251,0.141,0.435,0.376,0.751c0.159,0.212,0.475,0.345,0.844,0.354c0.368,0.025,0.741-0.083,1.139-0.183l0.104-0.025	C17.379,17.38,21.234,17.123,24.673,17.644z"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-links">
              <h4 className="footer-subtitle">Quick Links</h4>
              <ul>
                {["About", "Music", "Gallery", "Contact"].map((l) => (
                  <li key={l}>
                    <button
                      onClick={() => scrollToSection(l.toLowerCase())}
                      className="footer-link"
                    >
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="footer-subtitle">Latest Release</h4>
              <p className="release-title">"Nazraan"</p>
              <p className="release-subtitle">Available on all platforms</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              © 2024 Shudhita. All rights reserved. Made with love and music.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
