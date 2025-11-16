import React from 'react'

const Loader = () => {
    return (
        <div>
            <div style={overlayStyle}>
                <div style={spinnerStyle} />
            </div>
            <style jsx global>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
        </div>
    )
}
const overlayStyle = {
    position: "fixed",
    inset: 0,
    background: "rgba(255,255,255,0.85)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
};

const spinnerStyle = {
    width: 48,
    height: 48,
    borderRadius: "50%",
    border: "5px solid #e5e7eb",
    borderTopColor: "#111827",
    animation: "spin 1s linear infinite",
};

export default Loader
