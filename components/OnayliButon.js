'use client';

// Silme gibi geri alınamayan işlemlerden önce onay sorar.
export default function OnayliButon({ mesaj, children, className = 'kbtn tehlike' }) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(e) => {
        if (!window.confirm(mesaj)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
