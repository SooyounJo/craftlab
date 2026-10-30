import { useRef, useState } from 'react';
import Logo from '@/components/Logo';
import styles from '@/styles/frame.module.css';

const works = [
  {
    title: 'Movement Archive',
    desc: 'An archive robots can read.',
    left: 583,
    top: 124.45,
    images: ['/images/work-movement.png', '/images/work-movement-2.png'],
  },
  {
    title: 'Material Studies',
    desc: 'Where precision meets the hand.',
    left: 927,
    top: 178.45,
    images: ['/images/work-material.png', '/images/work-material-2.png'],
  },
  {
    title: 'Listening Interface',
    desc: 'Sound, motion, space — together.',
    left: 1271,
    top: 124.45,
    images: [
      '/images/work-listening.png',
      '/images/work-listening-2.png',
      '/images/work-listening-3.png',
    ],
  },
  {
    title: 'Responsive Stage',
    desc: 'Different every time.',
    left: 1652,
    top: 123.45,
    images: ['/images/work-stage.png'],
  },
  {
    title: 'Cultural Robotics',
    desc: 'Robots as a cultural medium.',
    left: 1996,
    top: 69.45,
    images: ['/images/work-cultural.png'],
  },
  {
    title: 'Open Workshop',
    desc: 'One shared workbench.',
    left: 2340,
    top: 123.45,
    images: ['/images/work-workshop.png'],
  },
];

const axes = {
  arts: {
    no: '01',
    code: 'CR[a]',
    title: 'Arts',
    body: 'Where performing arts meet robotics. We translate choreography, directing, and stagecraft into a language of robotic expression.',
    tags: 'Dance & Theatre · Choreographic Archives\nStage Direction · Motion Capture',
    images: ['/images/photo-arts.png'],
  },
  fabrication: {
    no: '02',
    code: 'CR[f]',
    title: 'Fabrication',
    body: 'Fabrication and craft. We explore the character of materials between the precision of robotic fabrication and the traces of the human hand.',
    tags: 'Robotic Fabrication · Additive Manufacturing ·\nCraft Collaborations · Large-Scale Installations',
    images: ['/images/photo-fabrication.png', '/images/photo-fabrication-2.png'],
  },
  technology: {
    no: '03',
    code: 'CR[t]',
    title: 'Technology',
    body: 'Sensing and interfaces. We design interfaces that interpret human intent and communicate the state of machines.',
    tags: 'HRI · Real-Time Sensing\nControl Interfaces · Data Visualization',
    images: ['/images/photo-technology.png'],
  },
};

function AxisRow({ id, open, onEnter }) {
  const axis = axes[id];

  return (
    <div
      className={styles.axisWrap}
      onMouseEnter={() => onEnter(id)}
      onClick={() => onEnter(id)}
    >
      {open === id ? (
        <div className={styles.axisCard}>
          <div className={styles.axisCardCopy}>
            <div>
              <span className={styles.badge}>{axis.no}</span>
              <p className={styles.axisCardCode}>{axis.code}</p>
              <h3>{axis.title}</h3>
            </div>
            <div>
              <p>{axis.body}</p>
              <p className={styles.axisTags}>{axis.tags}</p>
            </div>
          </div>
          <div className={styles.axisPhoto}>
            {axis.images.map((src) => (
              <img key={src} src={src} alt="" />
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.axis}>
          <span className={styles.badge}>{axis.no}</span>
          <span className={styles.axisText}>
            <p className={styles.axisCode}>{axis.code}</p>
            <p className={styles.axisName}>{axis.title}</p>
            <p className={styles.axisBody}>{axis.body}</p>
            <p className={styles.axisTags}>{axis.tags}</p>
          </span>
        </div>
      )}
    </div>
  );
}

export default function Frame({ lang, onLang }) {
  const [open, setOpen] = useState('fabrication');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [done, setDone] = useState(false);
  const trackRef = useRef(null);
  const drag = useRef({ on: false, x: 0, scroll: 0 });

  const onDown = (event) => {
    drag.current = { on: true, x: event.pageX, scroll: trackRef.current.scrollLeft };
  };
  const onMove = (event) => {
    if (!drag.current.on) return;
    const scale = Number(document.documentElement.style.getPropertyValue('--page-scale')) || 1;
    trackRef.current.scrollLeft = drag.current.scroll - (event.pageX - drag.current.x) / scale;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setDone(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className={styles.page}>
      <section className={styles.hero} id="top" data-snap>
        <div className={styles.heroFloor}>
          <div className={styles.heroFloorInner}>
            <img className={styles.heroFloorImg} src="/images/hero-bottom.png" alt="" />
            <div className={styles.heroFloorWash} />
          </div>
        </div>

        <div className={styles.heroVisual}>
          <img src="/images/hero-bg-5.png" alt="" />
          <div className={styles.heroGrad} />
        </div>

        <nav className={styles.nav}>
          <div className={styles.navLeft}>
            <a href="#research">
              <span>Arts &</span>
              <span>Fabrication</span>
            </a>
            <a href="#works">
              <span>Technology &</span>
              <span>Selected Work</span>
            </a>
          </div>
          <a href="#top" aria-label="CRAFT Lab">
            <Logo />
          </a>
          <div className={styles.navRight}>
            <button type="button" className={lang === 'kr' ? styles.active : ''} onClick={() => onLang('kr')}>
              KR
            </button>
            <button type="button" className={lang === 'en' ? styles.active : ''} onClick={() => onLang('en')}>
              EN
            </button>
          </div>
        </nav>

        <p className={styles.eyebrow}>
          Robot as
          <br />
          Cultural Medium
        </p>
        <h1 className={styles.title}>CRAFT Lab</h1>

        <div className={styles.about} id="about">
          <div className={styles.aboutRule} />
          <div className={styles.aboutRow}>
            <div>
              <p className={styles.aboutLead}>
                At CRAFT Lab, robotics goes beyond engineering. On stage, alongside audiences, and
                through materials, robots meet art to create new possibilities.
              </p>
              <p className={styles.aboutBody}>
                Across Arts, Fabrication, and Technology, choreographers, engineers, craftspeople,
                and researchers share one workbench to develop new ways of working.
              </p>
            </div>
            <p className={styles.aboutLabel}>About</p>
          </div>
        </div>
      </section>

      <section className={styles.research} id="research" data-snap>
        <div className={styles.researchIntro}>
          <h2>
            Three axes,
            <br />
            <span>one workbench.</span>
          </h2>
          <p>
            The brackets in our name denote a matrix. With CR as the constant,
            <br />
            a · f · t combine differently in every project.
          </p>
        </div>
        <div className={styles.researchRule}>
          <i />
        </div>
        <div
          className={styles.axisList}
          onMouseLeave={() => setOpen('fabrication')}
        >
          <AxisRow id="arts" open={open} onEnter={setOpen} />
          <AxisRow id="fabrication" open={open} onEnter={setOpen} />
          <AxisRow id="technology" open={open} onEnter={setOpen} />
        </div>
        <div className={styles.researchRuleBottom}>
          <i />
        </div>
      </section>

      <section className={styles.featureWrap} data-snap>
        <div className={styles.feature}>
          <div className={styles.featureBg}>
            <img src="/images/feature-robot.png" alt="" />
            <div className={styles.featureShade} />
          </div>
          <div className={styles.featureCopy}>
            <h2>
              Robot as
              <br />
              Cultural Medium.
            </h2>
            <p>
              Performance, exhibition, research and education are not separate. Whatever form it
              takes, each work is a record of people and machines responding to each other.
            </p>
          </div>
          <div className={styles.featureFrame}>
            <img src="/images/feature-dancer.png" alt="" />
          </div>
        </div>
      </section>

      <section className={styles.works} id="works" data-snap>
        <div className={styles.worksCopy}>
          <h2>
            Every Work
            <br />
            Becomes Material.
          </h2>
          <p>
            Performance, exhibition, research and education are not separate. Whatever form it
            takes, each work is a record of people and machines responding to each other.
          </p>
        </div>
        <div
          className={styles.worksTrack}
          data-hscroll
          ref={trackRef}
          onMouseDown={onDown}
          onMouseMove={onMove}
          onMouseUp={() => {
            drag.current.on = false;
          }}
          onMouseLeave={() => {
            drag.current.on = false;
          }}
        >
          <div className={styles.worksInner}>
            {works.map((work) => (
              <button
                type="button"
                key={work.title}
                className={styles.tile}
                style={{ left: work.left, top: work.top }}
              >
                {work.images.map((src) => (
                  <img key={src} src={src} alt="" draggable="false" />
                ))}
                <strong>{work.title}</strong>
                <em>{work.desc}</em>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.contact} id="contact" data-snap>
        <div className={styles.contactBg}>
          <img src="/images/contact-bg.png" alt="" />
          <img src="/images/contact-bg-2.png" alt="" />
        </div>
        <div className={styles.contactGlass} />
        <div className={styles.contactCopy}>
          <h2>
            JOIN
            <br />
            CRAFT Lab.
          </h2>
          <p>
            Explore opportunities across art, craft and technology.
            <br />
            Bring your curiosity, experience and ideas to the lab.
          </p>
        </div>
        <form className={styles.form} onSubmit={onSubmit}>
          <label
            onMouseDown={(event) => {
              const field = event.currentTarget.querySelector('input, textarea');
              if (field) field.focus();
            }}
          >
            <span>Name*</span>
            <input
              name="name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>
          <label
            onMouseDown={(event) => {
              const field = event.currentTarget.querySelector('input, textarea');
              if (field) field.focus();
            }}
          >
            <span>Email*</span>
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>
          <label
            onMouseDown={(event) => {
              const field = event.currentTarget.querySelector('input, textarea');
              if (field) field.focus();
            }}
          >
            <span>Message</span>
            <textarea
              name="message"
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </label>
          <button type="submit">Submit</button>
          {done ? <p className={styles.done}>Received. We will be in touch.</p> : null}
        </form>
      </section>

      <footer className={styles.footer} data-snap>
        <a className={styles.footerLogo} href="#top">
          <Logo variant="footer" />
        </a>
        <div className={styles.footerLine1} />
        <div className={styles.footerLine2} />
        <div className={styles.footerNav}>
          <span className={styles.head}>EXPLORE</span>
          <a href="#research">Arts · CR[a]</a>
          <a href="#research">Fabrication · CR[f]</a>
          <a href="#research">Technology · CR[t]</a>
          <a href="#contact">Careers</a>
          <span>&nbsp;</span>
          <span className={styles.head}>Lab</span>
          <a href="#about">Behaviour</a>
          <a href="#works">Selected Work</a>
          <a href="#contact">Join</a>
          <span>&nbsp;</span>
          <span className={styles.head}>CONNECT</span>
          <a href="mailto:hello@craftlab.kr">↗ hello@craftlab.kr</a>
          <span>↗ Seoul, Korea</span>
        </div>
        <p className={styles.footerLegal}>Terms & Conditions       Privacy Policy</p>
        <p className={styles.footerWord}>
          Robot as
          <br />
          Cultural Medium
        </p>
      </footer>
    </div>
  );
}
