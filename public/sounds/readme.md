Adding New Sounds

1. **Download your samples.**
   - There should be one file for each note from C3 to E3, 17 in total.
2. **Rename your samples.**
   - Sounds should take this format: C3.wav, Csharp3.wav, D3.wav, Dsharp3.wav&hellip;
   - This is case-sensitive. (c3, cSHARP3, D_3, d_sharp_three &rarr; NOPE.)
   - It doesn't matter what extension they are; everything will get combined into one file.
3. **Trim silence.** _(Optional)_
   - If there's silence at the start of the sample, it'll sound laggy. [Trim it with this FFMPEG command.](https://gist.github.com/kydecker/d49738402295a1a16afcebea1055da05)
4. **Generate a sprite.**
   - [You can do this with one command.](https://gist.github.com/kydecker/7c1782a292c0a215f96f2f9850c0ab71)
5. **Add the compiled sprite to the `/sounds` directory.**
