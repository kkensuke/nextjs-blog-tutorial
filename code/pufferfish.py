import numpy as np
import matplotlib.pyplot as plt
from matplotlib.colors import LinearSegmentedColormap


def laplacian(Z):
    # Compute the spatial spread (Laplacian) using the neighboring cells
    return (
        np.roll(Z, 1, axis=0) + np.roll(Z, -1, axis=0) +
        np.roll(Z, 1, axis=1) + np.roll(Z, -1, axis=1) - 4 * Z
    )


# Key parameters for generating a labyrinth-like pattern
Du, Dv = 0.16, 0.08   # Keep the diffusion coefficients unchanged
F, k = 0.042, 0.061   # Adjusting the balance between F and k produces a labyrinth pattern
iterations = 10000    # Increase the number of steps so the pattern spreads across the entire grid
size = 200            # Use a larger grid to capture finer mesh-like details

# Set up the initial state
U = np.ones((size, size))
V = np.zeros((size, size))

# Scatter random "seeds" across the entire grid
# to let the pattern grow globally
np.random.seed(42)    # Seed value for reproducibility
U += 0.05 * np.random.random((size, size))
V += 0.05 * np.random.random((size, size))

# Place an initial trigger near the center
r = 20
U[size // 2 - r:size // 2 + r, size // 2 - r:size // 2 + r] = 0.50
V[size // 2 - r:size // 2 + r, size // 2 - r:size // 2 + r] = 0.25

# Simulate the time evolution
for i in range(iterations):
    Lu = laplacian(U)
    Lv = laplacian(V)

    uvv = U * V * V

    U += Du * Lu - uvv + F * (1 - U)
    V += Dv * Lv + uvv - (F + k) * V

# Create a custom colormap inspired by the pufferfish-like image colors
colors = ["#132226", "#2c4a45", "#81a166", "#d9e8b3"]  # Dark green to light yellow-green
puffer_cmap = LinearSegmentedColormap.from_list("puffer", colors)

# Generate and display the image
plt.figure(figsize=(4, 4))
plt.imshow(V, cmap=puffer_cmap, interpolation="bicubic")
plt.axis("off")
plt.title("Labyrinth Pattern (Pufferfish Style)", fontsize=14)
plt.tight_layout()
plt.show()