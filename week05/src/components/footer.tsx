function Footer() {
  return (
    <footer className="mt-auto flex h-[57px] w-full items-center justify-end gap-2 bg-white px-20 py-4">
      <img src="/images/logos/tmdb-logo.svg" alt="TMDB" className="h-4 w-auto" />
      <p className="text-xs text-gray-600">
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </p>
    </footer>
  );
}

export default Footer;
