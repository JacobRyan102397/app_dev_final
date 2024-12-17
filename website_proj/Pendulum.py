import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from tkinter import Tk, Label, Entry, Button

# Create the main GUI window
root = Tk()
root.title("Pendulum Settings")

# Default parameters
default_angle = 45  # degrees
default_velocity = 0  # rad/s
default_length = 2.0  # meters
default_gravity = 9.81  # m/s^2

def start_simulation():
    # Retrieve user inputs
    angle = float(angle_entry.get()) * np.pi / 180  # Convert to radians
    velocity = float(velocity_entry.get())
    length = float(length_entry.get())
    gravity = float(gravity_entry.get())

    # Time parameters
    dt = 0.05
    t_max = 10
    t = np.arange(0, t_max, dt)

    # Function to compute the pendulum motion
    def pendulum_motion(theta0, omega0, length, g, t):
        theta = theta0
        omega = omega0
        theta_vals = []
        for _ in t:
            alpha = -(g / length) * np.sin(theta)  # Angular acceleration
            omega += alpha * dt                   # Update angular velocity
            theta += omega * dt                   # Update angle
            theta_vals.append(theta)
        return theta_vals

    # Calculate pendulum angles
    theta_vals = pendulum_motion(angle, velocity, length, gravity, t)

    # Convert angles to x, y coordinates
    x_vals = length * np.sin(theta_vals)
    y_vals = -length * np.cos(theta_vals)

    # Create a figure for animation
    fig, ax = plt.subplots()
    ax.set_aspect('equal', adjustable='box')
    ax.set_xlim(-length - 0.5, length + 0.5)
    ax.set_ylim(-length - 0.5, 0.5)

    # Create pendulum components
    line, = ax.plot([], [], 'o-', lw=2)
    trail, = ax.plot([], [], 'r-', lw=1, alpha=0.6)  # Optional trail
    trail_x, trail_y = [], []

    def init():
        line.set_data([], [])
        trail.set_data([], [])
        return line, trail

    def update(frame):
        x, y = x_vals[frame], y_vals[frame]
        line.set_data([0, x], [0, y])
        trail_x.append(x)
        trail_y.append(y)
        trail.set_data(trail_x, trail_y)
        return line, trail

    # Animate the pendulum
    ani = FuncAnimation(fig, update, frames=len(t), init_func=init, blit=True, interval=dt*1000)
    plt.show()

# GUI layout
Label(root, text="Initial Angle (degrees):").grid(row=0, column=0)
angle_entry = Entry(root)
angle_entry.insert(0, str(default_angle))
angle_entry.grid(row=0, column=1)

Label(root, text="Initial Velocity (rad/s):").grid(row=1, column=0)
velocity_entry = Entry(root)
velocity_entry.insert(0, str(default_velocity))
velocity_entry.grid(row=1, column=1)

Label(root, text="Pendulum Length (meters):").grid(row=2, column=0)
length_entry = Entry(root)
length_entry.insert(0, str(default_length))
length_entry.grid(row=2, column=1)

Label(root, text="Gravity (m/s^2):").grid(row=3, column=0)
gravity_entry = Entry(root)
gravity_entry.insert(0, str(default_gravity))
gravity_entry.grid(row=3, column=1)

Button(root, text="Start Simulation", command=start_simulation).grid(row=4, column=0, columnspan=2)

# Run the GUI
root.mainloop()
