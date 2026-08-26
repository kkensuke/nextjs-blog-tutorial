import numpy as np
import matplotlib.pyplot as plt


def generate_mandelbrot(width, height, x_min, x_max, y_min, y_max, max_iter):
    # Create a grid over the complex plane
    x = np.linspace(x_min, x_max, width)
    y = np.linspace(y_min, y_max, height)
    X, Y = np.meshgrid(x, y)
    C = X + 1j * Y
    Z = np.zeros_like(C)

    # Store the number of iterations required for each point to escape.
    # Points that never escape are assigned max_iter.
    escape_time = np.full(C.shape, max_iter, dtype=int)
    mask = np.ones(C.shape, dtype=bool)

    for i in range(max_iter):
        Z[mask] = Z[mask] ** 2 + C[mask]

        # A point is considered divergent once its magnitude exceeds 2
        diverged = mask & (np.abs(Z) > 2)
        escape_time[diverged] = i + 1
        mask[diverged] = False

        # Stop early if all points have already escaped
        if not mask.any():
            break

    return escape_time


# Generate and display the Mandelbrot set
image = generate_mandelbrot(
    width=800,
    height=800,
    x_min=-2.0,
    x_max=0.5,
    y_min=-1.25,
    y_max=1.25,
    max_iter=100,
)

plt.imshow(
    image,
    cmap="magma",
    extent=[-2.0, 0.5, -1.25, 1.25],
    origin="lower",
)
plt.axis("off")
plt.show()