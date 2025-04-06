// If you have a layout component, make sure it includes the Analytics route

// ...existing imports...

const MainLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          {/* ...existing routes... */}
          <Route path="/analytics/*" element={<Analytics />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default MainLayout;
