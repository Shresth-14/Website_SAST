import { motion, useTransform } from "framer-motion";

const TimelineItem = ({ event, index, totalItems, scrollYProgress, isReverse }) => {
  // Calculate when each item should appear based on scroll progress
  const itemOffset = index / (totalItems - 1);
  const itemProgress = useTransform(
    scrollYProgress,
    [Math.max(0, itemOffset - 0.15), Math.min(1, itemOffset + 0.05)],
    [0, 1]
  );

  // Pre-compute x transform
  const xTransform = useTransform(
    itemProgress,
    [0, 1],
    isReverse ? [-50, 0] : [50, 0]
  );

  return (
    <motion.div
      key={index}
      style={{
        opacity: itemProgress,
      }}
      className={`timeline-item ${isReverse ? 'reverse' : ''}`}
    >
      {/* Timeline dot with scale animation */}
      <motion.div
        style={{
          scale: itemProgress,
        }}
        className={`timeline-dot ${event.status === 'upcoming' ? 'pulse' : ''}`}
      >
        {event.status === 'upcoming' && (
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 rounded-full bg-blue-400"
          />
        )}
      </motion.div>

      {/* Content card */}
      <motion.div
        style={{
          opacity: itemProgress,
          x: xTransform
        }}
        className={`timeline-content ${isReverse ? 'reverse' : 'normal'}`}
      >
        <div className="timeline-card">
          <div className={`timeline-card-inner ${isReverse ? 'reverse' : ''}`}>
            <span className={`timeline-badge ${event.status === 'completed' ? 'completed' : 'upcoming'}`}>
              {event.category} • {event.status === 'completed' ? 'Completed' : 'Upcoming'}
            </span>
            <h3 className="timeline-event-title">{event.title}</h3>
            <p className="timeline-event-date">{event.date}</p>
            <p className="timeline-event-description">{event.description}</p>
          </div>
        </div>
      </motion.div>

      {/* Spacer for desktop */}
      <div className="timeline-spacer"></div>
    </motion.div>
  );
};

export default TimelineItem;