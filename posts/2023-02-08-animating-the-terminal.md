# Animating The Terminal

Recently I've been working on a version of the dice game Yahtzee that can run
in a terminal.

For anyone unfamiliar, Yahtzee is played by rolling dice in a
series of rounds and scoring points based on the values of the dice.  Each
player gets a scorecard which they must fill out with various rolls: three of
a kind, as many twos as possible, etc.  Each roll type can only be used once
and after all player's scorecards are completed, the player with the highest
score wins.

The terminal version of this game is only intended for a single player, with
the goal being to gain the highest score possible.  I hope to add multiple
computer players or a hot-seat mode in the future.

My first draft of the game used a very simplistic command and execute loop to
run through the player's turn.  The player could choose which dice to keep by
specifying the corresponding dice letter assigned to each, and the re-roll dice
with the command `roll`.

An example output looked like:

``` text
First Round:
a: 1, b: 4, c: 6, d: 2, e: 1

say 'keep' followed by your dice selections 'a b c' etc. to keep dice

say 'roll' to re-roll your dice

say 'select' to choose a place to score this roll
```

And the player could respond with `keep a e` followed by `roll` to re-roll dice
b, c, and e.

This mundane input/output loop worked for an initial draft of the game, but I
realized it was missing a lot of the excitement of playing yahtzee.  One of the
best parts of the game is hearing the rattle of dice in the cup and watching the
numbers spin around as the dice bounce and roll along the tabletop.  My
terminal game had none of the fun and joy of a physical game of Yahtzee.  It
needed some pizzazz.  It needed _animation_.

I discovered that an animation loop could be run in a terminal window using
ANSI escape characters.  These are the mechanisms that allow loading bars in
tools like NPM.  I could print a frame of animation written in ASCII to the
terminal, wait a few seconds, print the clear-screen ANSI code, and draw the
next frame.  The result would be a seamless animation of frames that could add
some pop and wow to my Yahtzee game.

To simulate the roll of dice, I drew up the following frames:

``` text
 -------   -------   -------   -------   -------   -------
|       | | o     | | o     | | o   o | | o   o | | o o o |
|   o   | |       | |   o   | |       | |   o   | |       |
|       | |     o | |     o | | o   o | | o   o | | o o o |
 -------   -------   -------   -------   -------   -------
```

And I made a short Scala program to run these frames in order:

``` scala mdoc
import cats.effect.*
import cats.syntax.all.*
import scala.concurrent.duration.*

object YahtzeeApp extends IOApp.Simple {
  
  val frames = List(
    // frames from earlier
  )

  val clearScreen: IO[Unit] = ???

  def run: IO[Unit] =
    frames.tailRecM[IO, Unit] {
      case next :: remaining =>
        for
          _ <- clearScreen
          _ <- IO.println(next)
          _ <- IO.sleep(0.5.seconds)
        yield Left(remaining)
      case _ => Right(())
    }
}
```
