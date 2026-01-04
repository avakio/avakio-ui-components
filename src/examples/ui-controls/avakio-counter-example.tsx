import React, { useMemo, useState } from "react";
import { AvakioCounter } from "../../components/avakio/ui-controls/avakio-counter/avakio-counter";

export function AvakioCounterExample({ theme = 'material' }: { theme?: string }) {
  const [quantity, setQuantity] = useState<number>(2);
  const [temperature, setTemperature] = useState<number>(18);
  const [step, setStep] = useState<number>(5);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const stats = useMemo(
    () => [
      { label: "Qty", value: quantity },
      { label: "Temp", value: temperature },
      { label: "Step", value: step },
    ],
    [quantity, temperature, step]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="counter-demo-card">
        <div className="counter-demo-row">
          <AvakioCounter
            label="Quantity"
            description="Single-source of truth"
            min={0}
            max={12}
            step={1}
            value={quantity}
            onChange={setQuantity}
          />
          <span className="counter-value-display">{quantity}</span>
        </div>
        <div className="counter-demo-row">
          <AvakioCounter
            label="Temperature"
            description="Allow typing"
            min={-30}
            max={60}
            step={2}
            value={temperature}
            onChange={setTemperature}
            allowInput
          />
          <span className="counter-value-display">{temperature}°C</span>
        </div>
        <div className="counter-demo-row">
          <AvakioCounter
            label="Step control test"
            description="Step can change"
            min={0}
            max={100}
            step={5}
            value={step}
            onChange={setStep}
            allowInput={false}
          />
          <span className="counter-value-display">step = {step}</span>
        </div>
        <div className="counter-actions">
          <button className="avakio-counter-btn" onClick={() => setIsDisabled((v) => !v)}>
            {isDisabled ? "Enable" : "Disable"}
          </button>
          <button className="avakio-counter-btn" onClick={() => setQuantity(2)}>Reset qty</button>
          <button className="avakio-counter-btn" onClick={() => setTemperature(18)}>Reset temp</button>
        </div>
      </div>

      <div className="counter-demo-grid">
        <div className="counter-demo-card">
          <h4>Sizes</h4>
          <div className="counter-group">
            <AvakioCounter label="Small" size="sm" min={0} max={10} step={1} value={3} readOnly />
            <AvakioCounter label="Default" min={0} max={10} step={1} value={4} readOnly />
            <AvakioCounter label="Large" size="lg" min={0} max={10} step={1} value={5} readOnly />
          </div>
        </div>

        <div className="counter-demo-card">
          <h4>Disabled + Readonly</h4>
          <div className="counter-group">
            <AvakioCounter label="Disabled" min={0} max={10} step={1} value={2} disabled />
            <AvakioCounter label="Readonly" min={0} max={10} step={1} value={7} readOnly />
            <AvakioCounter label="Readonly input" min={-5} max={5} step={1} value={-2} readOnly allowInput />
          </div>
        </div>

        <div className="counter-demo-card">
          <h4>Validation</h4>
          <div className="counter-group">
            <AvakioCounter label="Required" min={0} max={10} step={1} value={1} required />
            <AvakioCounter
              label="With error"
              min={0}
              max={10}
              step={1}
              value={12}
              error="Value exceeds max"
              allowInput
            />
          </div>
        </div>

        <div className="counter-demo-card">
          <h4>Dynamic ranges</h4>
          <div className="counter-group">
            <AvakioCounter label="Min/max" min={1} max={5} step={1} value={2} readOnly />
            <AvakioCounter label="Step 5" min={0} max={100} step={5} value={25} readOnly />
            <AvakioCounter label="Decimals" min={0} max={10} step={0.5} value={3.5} readOnly />
          </div>
        </div>
      </div>
    </div>
  );
}


















