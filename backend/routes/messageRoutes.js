router.post("/", authMiddleware, async (req, res) => {
  const msg = await Message.create({
    userId: req.user.userId,
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });

  res.json(msg);
});
