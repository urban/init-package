const { nextTick } = process

export default function interceptStream ({stdin, stdout}) {
  return {
    read: () => new Promise(resolve => {
      const captureOutput = (d) => resolve(d.toString().trim())
      stdout.once('data', captureOutput)
    }),
    write: str => {
      nextTick(() => { stdin.write(str + '\n') })
    }
  }
}
