import React, { useState } from 'react';
import Interface_Lesson from './Japanese_Tutorial/Interface_Lesson';

interface IcadGuideProps {
    onExit?: () => void;
}

function Icad_Guide({ onExit }: IcadGuideProps) {
    return (
        <Interface_Lesson onExit={onExit} />
    );
}

export default Icad_Guide;

