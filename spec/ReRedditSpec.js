describe("SocialMedia", () => {
  let ReReddit;

  beforeEach(() => {
    ReReddit = new SocialMedia();
  });

  it("Social Media object exist", () => {
    expect(typeof(ReReddit)).toEqual("object");
  });

})