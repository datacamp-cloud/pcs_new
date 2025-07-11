describe('POST /api/auth/send-otp', () => {
  it('devrait envoyer un OTP pour un numéro de téléphone valide', async () => {
    const phone = '1234567890';
    const res = await request(app)
      .post('/api/auth/send-otp')
      .send({ phone });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('OTP envoyé.');

    const otp = res.body.otp;  // Récupère l'OTP envoyé

    // Vérifie ensuite l'OTP dans un autre test
    const verifyRes = await request(app)
      .post('/api/auth/verify-otp')
      .send({ phone, otp });

    expect(verifyRes.status).toBe(200);
    expect(verifyRes.body.message).toBe('OTP vérifié avec succès.');
  });
});
