export function DobeeAi() {
  return (
    <>
      <style>{`
        .crystal-ball-container {
          position: relative;
          width: 150px;
          height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .crystal-ball-image {
          position: relative;
          width: 150px;
          height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: float 3s ease-in-out infinite, fade 3s ease-in-out infinite;
        }

        .floating-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes fade {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>

      <div className="crystal-ball-container">
        <div className="crystal-ball-image">
          <img
            src="/logo.png"
            alt="Bead by Dobee cloud"
            className="floating-image"
          />
        </div>
      </div>
    </>
  );
}
